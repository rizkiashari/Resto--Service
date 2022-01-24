const express = require("express");
const router = express.Router();
const { uploadFile } = require("../middlewares/uploadFile");
const {
  addResto,
  updateResto,
  deleteResto,
  getRestoById,
  getAllResto,
} = require("../controllers/Resto");

//*--------- Resto ----------*//
router.post("/resto", uploadFile("picture"), addResto);
router.patch("/resto/:id", updateResto);
router.delete("/resto/:id", deleteResto);
router.get("/resto/:id", getRestoById);
router.get("/resto", getAllResto);

module.exports = router;
