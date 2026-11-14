/** Editorial inputs and publication boundaries for each independent volume.
 * `enabled` is an explicit publication gate, never inferred from file existence.
 * Add only completed, reviewed volumes to the public build.
 */
export const volumes = [
  {
    id: 'volume1', enabled: true, title: '卷一·基本算法',
    book: '计算机程序设计艺术·卷1·基本算法.md', report: '校订报告.md',
    routePrefix: '/volume1', reportRoute: '/corrections', zipName: 'taocp-volume1.zip',
    assetRoots: ['assets/figures', 'assets/review'], reviewRoot: 'assets/review',
    reviewPublicPrefix: '/review',
    chapterRoots: ['1', '2'], answerStartAnchor: 'sec-answers', answerEndAnchor: 'sec-app-a',
    appendixAnchors: ['sec-app-a', 'sec-app-b', 'sec-app-c'],
    indexAnchors: ['sec-names', 'sec-index'], frontmatterHeadingLine: 2,
    expectedSourcePages: 534,
    evidence: {
      math: 'assets/review/完整公式语法检查.json',
      numbered: 'assets/review/编号项逐条复核.jsonl',
      figures: 'assets/review/原图与图题索引.json',
      mathCountNote: 'The editorial count used Pandoc. The website fixes seven space-before-closing-dollar expressions and two nested-delimiter expressions without changing their non-delimiter contents. Seven recovered formulas explain the net increase; the HTML table formula is counted in both totals. Every formula is compared individually, rather than relying on the count.'
    }
  },
  {
    id: 'volume2', enabled: true, title: '卷二·半数值算法',
    book: '计算机程序设计艺术·卷2·半数值算法.md', report: '校订报告·卷2.md',
    routePrefix: '/volume2', reportRoute: '/volume2/corrections', zipName: 'taocp-volume2.zip',
    assetRoots: ['assets/volume2'], reviewRoot: 'assets/volume2/review',
    reviewPublicPrefix: '/review/volume2',
    chapterRoots: ['3', '4'], answerStartAnchor: 'sec-answers', answerEndAnchor: 'sec-app-a',
    appendixAnchors: ['sec-app-a', 'sec-app-b', 'sec-app-c', 'sec-mix-reference'], indexAnchors: ['sec-names', 'sec-index'],
    frontmatterHeadingLine: 2,
    leadInAnchors: { 'sec-4-2-2': 'lead-sec-4-2-2' },
    // Includes retained anchors for omitted packaging and document information.
    expectedSourcePages: 618,
    evidence: {
      figures: 'assets/volume2/review/formal-figures.json',
      mathCountNote: 'All source and rendered formulas are compared individually. Source-page image reviews and preserved source questions are recorded independently; syntax equality does not prove every original mathematical assertion.'
    }
  }
];

export function enabledVolumes() {
  const selected = volumes.filter(volume => volume.enabled);
  if (!selected.length) throw new Error('No volume is enabled for publication');
  const unique = key => new Set(selected.map(volume => volume[key])).size === selected.length;
  for (const key of ['id', 'book', 'report', 'routePrefix', 'reportRoute', 'zipName']) {
    if (!unique(key)) throw new Error(`Duplicate volume configuration: ${key}`);
  }
  for (const volume of selected) {
    if (!/^volume\d+$/.test(volume.id) || !/^\/volume\d+$/.test(volume.routePrefix)) throw new Error(`Invalid volume id or route: ${volume.id}`);
    if (!Number.isInteger(volume.expectedSourcePages) || volume.expectedSourcePages < 1) throw new Error(`Source page count must be confirmed for ${volume.id}`);
    if (!volume.chapterRoots.length || !volume.assetRoots.length) throw new Error(`Missing chapter or asset configuration for ${volume.id}`);
    for (const value of [volume.book, volume.report, ...volume.assetRoots, volume.reviewRoot]) {
      if (value.startsWith('/') || value.split('/').some(part => part === '..') || value.includes('\\')) throw new Error(`Unsafe configured input path: ${value}`);
    }
    if (!volume.assetRoots.every(root => root === 'assets' || root.startsWith('assets/'))) throw new Error(`Assets must stay under assets/: ${volume.id}`);
    if (!volume.reportRoute.startsWith('/') || !/^taocp-volume\d+\.zip$/.test(volume.zipName)) throw new Error(`Invalid report or ZIP route: ${volume.id}`);
  }
  const roots = selected.flatMap(volume => volume.assetRoots.map(root => ({ id: volume.id, root })));
  for (let i = 0; i < roots.length; i++) for (let j = i + 1; j < roots.length; j++) {
    const a = roots[i], b = roots[j];
    if (a.root === b.root || a.root.startsWith(b.root + '/') || b.root.startsWith(a.root + '/')) throw new Error(`Overlapping asset roots: ${a.id}:${a.root}, ${b.id}:${b.root}`);
  }
  return selected;
}

export function selectVolumes(id) {
  if (!id) return enabledVolumes();
  const volume = volumes.find(value => value.id === id);
  if (!volume) throw new Error(`Unknown volume: ${id}`);
  return [volume];
}

export const volumeManifestFile = volume => `docs/.vitepress/book-manifest-${volume.id}.json`;
