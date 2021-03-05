import Product from '../models/Product.model.js';

function postProduct(req, res) {
  const newProduct = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
  });
  newProduct
    .save()
    .then(() => res.json('Product was saved.'))
    .catch((error) => res.json(error));
}

function getProducts(req, res) {
  Product.find()
    .then((products) => res.json(products))
    .catch((error) => res.json(error));
}

function getProduct(req, res) {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => res.json(product))
    .catch((error) => res.json(error));
}

export { postProduct, getProducts, getProduct };
