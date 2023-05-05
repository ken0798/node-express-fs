const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", getAddProduct);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

// /admin/products => GET
router.get("/products", getProducts);

// /admin/edit-product => GET
router.get("/edit-product/:productId", getEditProduct);

// /admin/edit-product => POST
router.post("/edit-product", postEditProduct);

//  /admin/delete-product =>POST
router.post("/delete-product", postDeleteProduct);

module.exports = router;
