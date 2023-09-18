const bcrypt = require("bcrypt");
const { checkEmailExists } = require("../../utils");
const prisma = require("../../../prisma/prisma-client");

const userRegister = async (req, res) => {
  // TODO: userRegister
  const { user_email, user_password } = req.body;
  if (await checkEmailExists(user_email)) {
    res.json({ user_registered: false, message: "User already exists" });
  } else {
    let hashedPassword = bcrypt.hashSync(user_password, 10);
    const createdUser = await prisma.user.create({
      data: {
        user_email: user_email,
        user_password: hashedPassword,
      },
    });
    res.json({
      user_registered: true,
      message: "User Registered Successfully",
    });
  }
};
module.exports = { userRegister };
