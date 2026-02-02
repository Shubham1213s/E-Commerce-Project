// const express = require("express");
// const router = express.Router();
// const {
//   createProduct,
//   getProducts,
// } = require("../controllers/productController");

// router.post("/", createProduct);   // add product
// router.get("/", getProducts);      // get all products

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", getProducts);
router.post("/", protect, adminOnly, createProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
