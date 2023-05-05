const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    let cart = { products: [], totalPrice: 0 };
    fs.readFile(p, (err, content) => {
      if (!err) {
        cart = JSON.parse(content);
      }
      const findIndex = cart.products.findIndex((p) => p.id === id);
      const existingItem = cart.products[findIndex];
      let updatedProduct;
      if (existingItem) {
        // existingItem.qty += 1;
        updatedProduct = { ...existingItem };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[findIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, content) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(content);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((pro) => pro.id === id);
      if (!product) {
        return;
      }
      updatedCart.products = updatedCart.products.filter(
        (pro) => pro.id !== id
      );
      updatedCart.totalPrice -= product.qty * +price;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, content) => {
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(content);
        cb(cart);
      }
    });
  }
};
