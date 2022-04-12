var express = require("express");
const { CreateProduct, getOwnProducts, CreateProductRating, getProductById, updateProduct, deleteProduct, getAllProduct, getOwnProductByUid, getBusinessProducts } = require("../controllers/products/productController");
const { isSignedIn } = require("../middleware/authMiddleware");
var router = express.Router();

router.get("/getallproduct", getAllProduct)
router.post("/getOwnProducts", isSignedIn, getOwnProducts);
router.post("/", getBusinessProducts);
router.post("/createproduct", isSignedIn, CreateProduct);
router.get("/getOwnProductByUid", isSignedIn, getOwnProductByUid);
router.put("/", CreateProductRating)
router
    .get("/:id", getProductById)
    .delete("/:id", isSignedIn, deleteProduct)
    .put("/:id", isSignedIn, updateProduct);

module.exports = router
