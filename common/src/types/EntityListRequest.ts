type EntityListRequest<Filter = undefined, OrderBy = undefined> = {
  skip: number,
  take: number,
  filter?: Filter,
  orderBy?: OrderBy,
}

export default EntityListRequest;
