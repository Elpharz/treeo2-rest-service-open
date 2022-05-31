export const getPage = (req) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  let page = 1;

  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  return page;
};

export const getSize = (req) => {
  const sizeAsNumber = Number.parseInt(req.query.size);
  let size = 20;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 20) {
    size = sizeAsNumber;
  }
  return size;
};

export const getOffset = (page, limit) => {
  return page * limit - limit;
};

export const getNextPage = (page, limit, total) => {
  if (total / limit > page) {
    return page + 1;
  }
  return null;
};

export const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};

export const sortParam = (value: any) => {
  if (value && value.sort) {
    return value.sort.split(':')[0];
  }
  return 'createdAt';
};
export const sortOrder = (value: any) => {
  if (value && value.sort) {
    return value.sort.split(':')[1];
  }
  return 'DESC';
};
