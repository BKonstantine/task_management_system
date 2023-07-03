export function getPagingRange(currentPage, maxPages) {
  const pages = [];

  if (maxPages <= 7) {
    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(maxPages);
    } else if (currentPage >= maxPages - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = maxPages - 4; i <= maxPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(maxPages);
    }
  }

  return pages;
}
