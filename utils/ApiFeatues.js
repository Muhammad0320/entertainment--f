class ApiFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }

  filter() {
    const queryObject = { ...this.queryString };

    const excludedQuery = ["sort", "limit", "page", "field"];

    excludedQuery.forEach((el) => delete queryObject[el]);

    // Advanced filtering

    let queryStr = JSON.stringify(queryObject).replace(
      /\b(lt|lte|gt|gte)\b/g,
      (match) => `$${match}`
    );

    queryStr = JSON.parse(queryStr);

    this.query = this.query.find(queryStr);

    return this;
  }
}

module.exports = ApiFeatures;