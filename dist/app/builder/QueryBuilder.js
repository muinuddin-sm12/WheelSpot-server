"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const searchTerm = this.query.search;
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
        const queryObj = Object.assign({}, this.query);
        // console.log('before delete',queryObj);
        const excludeFields = ['search'];
        excludeFields.forEach((el) => delete queryObj[el]);
        // console.log('after delete', queryObj)
        if (queryObj.filter) {
            queryObj.author = new mongoose_1.default.Types.ObjectId(queryObj.filter);
            delete queryObj.filter;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
}
exports.default = QueryBuilder;
