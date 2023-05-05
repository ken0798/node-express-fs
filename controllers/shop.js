const Products = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = function (req, res, next) {
  Products.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/products",
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getCart = function (req, res) {
  Cart.getCart((cart) => {
    Products.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartItem = cart.products.find((pro) => pro.id === product.id);
        if (cartItem) {
          cartProducts.push({ data: product, qty: cartItem.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "My Cart",
        path: "/cart",
        cartList: cartProducts,
      });
    });
  });
};

exports.postCart = function (req, res) {
  const id = req.body.productId;
  Products.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

exports.postDeleteCartItem = function (req, res) {
  const id = req.body.productId;
  Products.findById(id, (product) => {
    Cart.deleteProduct(id, product.price);
  });
  res.redirect("/cart");
};

exports.getCheckout = function (req, res) {
  res.render("shop/check", {
    pageTitle: "Check",
    path: "/check",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.getIndex = function (req, res) {
  Products.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Products",
      path: "/",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
    });
  });
};

exports.getOrders = function (req, res) {
  res.render("shop/orders", {
    pageTitle: "Products",
    path: "/orders",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.getProduct = function (req, res) {
  const proId = req.params.proId;
  Products.findById(proId, (product) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      product,
      productCSS: true,
    });
  });
};

/* Async
exports.getProducts = async function (req, res, next) {
  const products = await Products.fetchAll();
  console.log(products);
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
*/
