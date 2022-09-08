const express = require("express");
const app = express();
const { products } = require("../data"); //destructuring

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>Products</a>");
});

//send specific data --> here only id, name and image is sent
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

//params
app.get("/api/products/:productID", (req, res) => {
  //console.log(req.params); //it is an object
  const pID = req.params.productID; //it is a string

  const singleProduct = products.find((product) => product.id === Number(pID));
  if (!singleProduct) {
    res.status(404).send("Product does not exist");
  }
  res.json(singleProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("Hello World");
});

//query params
app.get("/api/v1/query", (req, res) => {
  // console.log(req.query); //it is an object
  const { search, limit } = req.query; //destructuring
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if(limit){
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if(sortedProducts.length < 1){
    // res.status(200).send('No Products Found');
    return res.status(200).json({success: true, data: []})
  }
  res.status(200).json(sortedProducts);
});

//listening the server
app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

//slice doesnt change the original array
//Syntax: slice(0,2) --> starts at 0 and goes to 1, 2 is excluded