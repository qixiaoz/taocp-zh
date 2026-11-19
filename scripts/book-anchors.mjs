/** Pagination and numbered-table anchors may belong to their semantic element.
 * Keeping them on valid tables, captions, rows or row groups avoids empty links
 * inside a cell and invalid HTML that browsers would move above the table.
 */
export function sourceAnchorIds(markdown) {
  return [...markdown.matchAll(/<(a|table|p|tbody|tr)\s+id="([^"]+)"[^>]*>/g)]
    .filter(([, tag, id]) => tag === 'a' || /^(?:pdf-\d+|p-.+|tab-.+)$/.test(id))
    .map(([, , id]) => id);
}
