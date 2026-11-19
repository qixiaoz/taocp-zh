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
  },
  {
    id: 'volume3', enabled: true, title: '卷三·排序与查找',
    book: '计算机程序设计艺术·卷3·排序与查找.md', report: '校订报告·卷3.md',
    routePrefix: '/volume3', reportRoute: '/volume3/corrections', zipName: 'taocp-volume3.zip',
    assetRoots: ['assets/volume3'], reviewRoot: 'assets/volume3/review',
    reviewPublicPrefix: '/review/volume3',
    chapterRoots: ['5', '6'], answerStartAnchor: 'sec-answers', answerEndAnchor: 'sec-app-a',
    appendixAnchors: ['sec-app-a', 'sec-app-b', 'sec-app-c'],
    indexAnchors: ['sec-names', 'sec-index'], frontmatterHeadingLine: 2,
    leadInAnchors: { 'sec-6-2-4': 'lead-sec-6-2-4', 'sec-6-3': 'lead-sec-6-3' },
    expectedSourcePages: 625,
    evidence: {
      figures: 'assets/volume3/review/formal-figures.json',
      mathCountNote: 'Source coverage and counts belong to Volume 3 only. Approved English frontmatter supplementation retains separate source anchors; unresolved source questions and author errata are recorded independently from rendering checks.'
    }
  },
  {
    id: 'volume4a', enabled: true, title: '卷4A·组合算法（一）',
    book: '计算机程序设计艺术·卷4A·组合算法（一）.md', report: '校订报告·卷4A.md',
    routePrefix: '/volume4a', reportRoute: '/volume4a/corrections', zipName: 'taocp-volume4a.zip',
    assetRoots: ['assets/volume4a'], reviewRoot: 'assets/volume4a/review',
    reviewPublicPrefix: '/review/volume4a',
    chapterRoots: ['7'], answerStartAnchor: 'sec-answers', answerEndAnchor: 'sec-app-a',
    appendixAnchors: ['sec-app-a', 'sec-app-b', 'sec-app-c', 'sec-app-d'],
    indexAnchors: ['sec-names', 'sec-index'], frontmatterHeadingLine: 2,
    headingLookahead: { 'sec-7-1': 13 },
    expectedSourcePages: 746,
    evidence: {
      mathCountNote: 'Volume 4A uses its own 746-page source and original chapter 7 numbering. Author errata, source-image comparison, finite recomputation, syntax and rendered equality are distinct forms of evidence; source questions remain explicit.'
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
    if (!/^volume\d+[a-z]?$/.test(volume.id) || !/^\/volume\d+[a-z]?$/.test(volume.routePrefix)) throw new Error(`Invalid volume id or route: ${volume.id}`);
    if (!Number.isInteger(volume.expectedSourcePages) || volume.expectedSourcePages < 1) throw new Error(`Source page count must be confirmed for ${volume.id}`);
    if (!volume.chapterRoots.length || !volume.assetRoots.length) throw new Error(`Missing chapter or asset configuration for ${volume.id}`);
    for (const value of [volume.book, volume.report, ...volume.assetRoots, volume.reviewRoot]) {
      if (value.startsWith('/') || value.split('/').some(part => part === '..') || value.includes('\\')) throw new Error(`Unsafe configured input path: ${value}`);
    }
    if (!volume.assetRoots.every(root => root === 'assets' || root.startsWith('assets/'))) throw new Error(`Assets must stay under assets/: ${volume.id}`);
    const ownReport = /^\/volume\d+[a-z]?\/[a-z\d/-]+$/.test(volume.reportRoute)
      && volume.reportRoute.startsWith(volume.routePrefix + '/');
    const legacyReport = volume.id === 'volume1' && volume.reportRoute === '/corrections';
    if (!(ownReport || legacyReport) || !/^taocp-volume\d+[a-z]?\.zip$/.test(volume.zipName)) throw new Error(`Invalid report or ZIP route: ${volume.id}`);
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
