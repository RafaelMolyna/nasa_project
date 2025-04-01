const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  const page = Math.abs(query.page) || 1;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;

  return {
    skip: (page - 1) * limit,
    limit,
  };
}

module.exports = { getPagination };
