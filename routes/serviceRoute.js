var express = require("express");
const {
    CreateService,
    getOwnServicees,
    getServiceById,
    deleteService,
    updateService, 
    CreateServiceRating,
    getAllService,
    getOwnServicesByUid,
    getServiceByBid
} = require("../controllers/service/serviceController.js");
var router = express.Router();
const { isSignedIn } = require("../middleware/authMiddleware")

router.get("/getallservice", getAllService)
router.post("/", getOwnServicees);
router.get("/getownservicesbyuid", isSignedIn, getOwnServicesByUid);
// router.get("/getownservicesbyuid", getServiceByBid);
router.put("/", CreateServiceRating)
router.post("/createservice", isSignedIn,  CreateService);
router
    .get("/:id", getServiceById)
    .delete("/:id", isSignedIn, deleteService)
    .put("/:id", isSignedIn, updateService);

module.exports = router
