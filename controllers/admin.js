const Products = require("../models/product");

exports.getAddProduct = function (req, res, next) {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    edit: null,
  });
};

exports.postAddProduct = function (req, res) {
  const values = Object.values(req.body);
  const product = new Products(null, ...values);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.getEditProduct = function (req, res) {
  const edit = req.query.edit;
  const productId = req.params.productId;
  if (!edit) {
    return res.redirect("/");
  }
  Products.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      product,
      pageTitle: "Edit Product",
      path: null,
      edit: edit,
    });
  });
};

exports.postEditProduct = function (req, res) {
  const values = Object.values(req.body);
  const product = new Products(...values);
  product.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = function (req, res) {
  const productId = req.body.productId;
  // Products.deleteById(productId, (products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //     hasProducts: products.length > 0,
  //     activeShop: true,
  //     productCSS: true,
  //   });
  // });
  Products.deleteById(productId);
  res.redirect("/admin/products");
};

exports.getProducts = function (req, res) {
  Products.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
