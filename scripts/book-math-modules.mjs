import { createHash } from 'node:crypto';

// Give Vue short bindings instead of compiling every complete KaTeX tree as a
// template literal. Both SSR and the client import the same pre-rendered HTML.
export function createBookMathModules() {
  const prefix = 'virtual:book-math/';
  const modules = new Map();

  return {
    plugin: {
      name: 'book-math-modules',
      resolveId(id) {
        if (id.startsWith(prefix)) return '\0' + id;
      },
      load(id) {
        if (!id.startsWith('\0' + prefix)) return;
        const module = modules.get(id.slice(1));
        if (!module) throw new Error('Missing pre-rendered formula table: ' + id);
        return 'export default ' + JSON.stringify(module);
      },
      outputOptions(options) {
        const assignChunk = options.manualChunks;
        if (typeof assignChunk !== 'function') return;
        // VitePress emits both a navigation chunk and a lean hydration chunk
        // for each page. Keep the (identical) formula data in one shared file.
        return {
          ...options,
          manualChunks(id, context) {
            if (id.startsWith('\0' + prefix) && modules.get(id.slice(1))?.length)
              return 'book-math-' + id.slice(prefix.length + 1, prefix.length + 17);
            return assignChunk(id, context);
          }
        };
      }
    },
    install(md) {
      const render = md.render.bind(md);
      md.render = (source, env = {}) => {
        if (env.bookDirectHTML || !env.relativePath || !/^---\n[^\n]*\nbookPage: true\n---\n/.test(source))
          return render(source, env);
        const digest = createHash('sha256').update(source).digest('hex');
        const id = prefix + digest;
        const indices = new Map();
        const formulas = [];
        env.bookMathIndex = (key, html) => {
          if (!indices.has(key)) {
            indices.set(key, formulas.length);
            formulas.push(html);
          }
          return indices.get(key);
        };
        try {
          const html = render(source + '\n\n<script setup>\nimport bookFormulae from ' + JSON.stringify(id) + '\n</script>\n', env);
          modules.set(id, formulas);
          return html;
        } finally {
          delete env.bookMathIndex;
        }
      };
    }
  };
}
