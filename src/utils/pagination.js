/**
 * Pagination helpers (reusable for other endpoints)
 */

export function parsePagination(query = {}, defaults = { page: 1, limit: 10 }) {
  const pageRaw = query.page;
  const limitRaw = query.limit;

  const page = toPositiveInt(pageRaw, defaults.page);
  const limit = toPositiveInt(limitRaw, defaults.limit);

  return { page, limit };
}

export function paginateArray(items, { page = 1, limit = 10 } = {}) {
  const totalCount = items.length;

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const start = (page - 1) * limit;
  const end = start + limit;

  const data = items.slice(start, end);

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
    },
  };
}

function toPositiveInt(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}
