import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.search as string;
    if (searchTerm) {
      const searchTerms = searchTerm.split(' ');
      const searchQuery = {
        $and: searchTerms.map((term) => ({
          $or: searchableFields.map((field) => ({
            [field]: { $regex: term, $options: 'i' },
          })),
        })),
      };
      this.modelQuery = this.modelQuery.find(searchQuery);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    // console.log('before delete',queryObj);
    const excludeFields = ['search'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // console.log('after delete', queryObj)
    if (queryObj.filter) {
      queryObj.brand = queryObj.filter;
      delete queryObj.filter;
    }
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
}
export default QueryBuilder;
