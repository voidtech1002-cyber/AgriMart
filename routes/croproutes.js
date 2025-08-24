const express = require("express");
const router = express.Router();
const cropController = require("../controllers/cropController");
const upload = require("../middleware/multer");

router.post("/", upload.array("files", 5), cropController.createCrop);
router.get("/", cropController.getAllCrops);
router.get("/:userId", cropController.getAllCropsByUser);
router.put("/:userId", cropController.updateCropByUserId);

module.exports = router;
