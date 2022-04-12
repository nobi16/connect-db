var express = require("express");
const {
    CreateBusiness,
    getOwnBusinesses,
    getBusinessById,
    deleteBusiness,
    updateBusiness, 
    getAllBusiness,
    CreateRating} = require("../controllers/business/businessController");
var router = express.Router();
const { isSignedIn } = require("../middleware/authMiddleware");

router.get("/", isSignedIn, getOwnBusinesses);
router.put("/", CreateRating);
router.get("/getallbusiness", getAllBusiness);
router.post("/createbusiness", isSignedIn, CreateBusiness);
router
    .get("/:id", getBusinessById)
    .delete("/:id", isSignedIn, deleteBusiness)
    .put("/:id", isSignedIn, updateBusiness);

module.exports = router
