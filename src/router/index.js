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
const {
  addTypeFood,
  updateTypeFood,
  deleteTypeFood,
  getTypeFoodById,
  getAllTypeFood,
} = require("../controllers/TypeFood");

//*--------- Resto ----------*//
router.post("/resto", uploadFile("picture"), addResto);
router.patch("/resto/:id", updateResto);
router.delete("/resto/:id", deleteResto);
router.get("/resto/:id", getRestoById);
router.get("/resto", getAllResto);

//*--------- TypeFood ----------*//
router.post("/typefood", uploadFile("pictureFood"), addTypeFood);
router.patch("/typefood/:id", updateTypeFood);
router.delete("/typefood/:id", deleteTypeFood);
router.get("/typefood/:id", getTypeFoodById);
router.get("/typefood", getAllTypeFood);

module.exports = router;
