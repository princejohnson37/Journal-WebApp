const { Router } = require("express");
const controller = require("./controller");

const router = Router();
router.post("/", controller.userLogin);

module.exports = router;
