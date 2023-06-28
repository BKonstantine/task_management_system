export function getPagingRange(
  current,
  { min = 1, total = 10, length = 3 } = {}
) {
  if (length > total) length = total;

  let start = current - Math.floor(length / 2);
  start = Math.max(start, min);
  start = Math.min(start, min + total - length);

  return Array.from({ length: length }, (el, i) => start + i);
}
