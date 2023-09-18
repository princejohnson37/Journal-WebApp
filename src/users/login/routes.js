const { Router } = require("express");
const controller = require("./controller");

const router = Router();
// POST `localhost/api/login/`
router.post("/", controller.userLogin);

module.exports = router;
