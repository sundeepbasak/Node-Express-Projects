const Product = require("../models/products.model"); //import Product model

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 90 } })
    .sort("name")
    .select("name price");
  res.status(200).json({ products, qty: products.length });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, sort, fields, numericFilters } = req.query; //destructuring query properties from req.query
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    // console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  //if we have 23 products, and we limit per page to 7 products, then  we get 7 7 7 2 ---> total 4 pages

  const products = await result;
  res.status(200).json({ products, qty: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };

//before we use try-catch to handle async errors
//now we are using express-async-errors package to handle async errors

/* implement search functionality
mongoose query: .find()
.find({}) gives all objects
.find({ company: 'marcos'}) gives only those objects whose company name is marcos

endpoint: /api/v1/search?query=search-term
eg: /api/v1/search?name=john&company=marcos

we do not pass req.query directly to find method-
const products = await Product.find(req.query);
--> as if we pass some properties in the find which doesnt exist then it wont show us any products and we dont want that
-->instead, we want to show all products if the query prop we pass do not exist 
*/

//$regex : mongodb query operator
//Provides regular expression capabilities for pattern matching strings in queries.

//sort products: by name
// api/v1/products?sort=name  --> ascending order
// api/v1/products?sort=-name --> descending order

//sort products by name and price
// api/v1/products?sort=name,price  --> ascending order

/* methods:
sort --> helps in sorting in asc or desc
select --> only shows the selected fields for products
limit --> limits the products to a certain number
skip(2) --> skips the first 2 elements of the product list
page --> products in a certain page, depends on limit

const products = await Product.find({})
    .sort("name")
    .select("name price")
    .limit(4)
    .skip(1);
*/

//$gt and $lt --> greater than & less than
