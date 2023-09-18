const { Router } = require("express");
const controller = require("./controller");

const router = Router();
//  POST `localhost/api/register/`
router.post("/", controller.userRegister);

module.exports = router;
