const { Router } = require("express");
const { authenticateToken } = require("../middleware/authToken");
const controller = require("./controller");
const router = Router();

// get top 10 diary entries
router.get("/all", authenticateToken, controller.getDiaryEntries);

// get specific diary entry
router.get("/entry/:id", authenticateToken, controller.getDiaryEntry);

// post new diary entry
router.post("/entry", authenticateToken, controller.postDiaryEntry);

// update existing diary entry
router.put("/update/entry", authenticateToken, controller.updateDiaryEntry);

// delete a diary entry
router.delete("/delete/:id", authenticateToken, controller.deleteDiaryEntry);

module.exports = router;
