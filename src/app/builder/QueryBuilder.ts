import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    // console.log('before delete',queryObj);
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // console.log('after delete', queryObj)
    if (queryObj.filter) {
      queryObj.author = new mongoose.Types.ObjectId(queryObj.filter as string);
      delete queryObj.filter;
    }
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sortBy() {
    const sortBy = (this?.query?.sortBy as string) || 'createdAt';
    const sortOrder = this?.query?.sortOrder === 'asc' ? '' : '-';
    const sort = `${sortOrder}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }
}
export default QueryBuilder;
