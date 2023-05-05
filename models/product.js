const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const Cart = require("./cart");
const p = path.join(rootDir, "data", "products.json");

const getProds = (cb) => {
  fs.readFile(p, (err, cont) => {
    if (err || cont.toString().length === 0) {
      return cb([]);
    }
    cb(JSON.parse(cont));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProds((products) => {
      if (this.id) {
        const existingIndex = products.findIndex((pro) => pro.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err, "v");
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id, cb) {
    getProds((products) => {
      const price = products.find((pro) => pro.id === id).price;
      const updatedProducts = products.filter((pro) => pro.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
        if (!err) Cart.deleteProduct(id, price);
      });
      // cb(products)
    });
  }

  static fetchAll(cb) {
    getProds(cb);
  }

  static findById(id, cb) {
    getProds((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
