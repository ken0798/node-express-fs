const express = require("express");
const {
  getProducts,
  getCart,
  getIndex,
  getCheckout,
  getOrders,
  getProduct,
  postDeleteCartItem,
  postCart,
} = require("../controllers/shop");
const router = express.Router();

router.get("/", getIndex);

router.get("/cart", getCart);
router.post("/cart", postCart);

router.post("/cart-delete", postDeleteCartItem);

router.get("/orders", getOrders);

router.get("/products", getProducts);

router.get("/products/:proId", getProduct);

router.get("/checkout", getCheckout);

module.exports = router;
