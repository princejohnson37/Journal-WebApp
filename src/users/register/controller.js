const bcrypt = require("bcrypt");
const queries = require("../queries");
const { checkEmailExists } = require("../../utils");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userRegister = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  console.log("pass",user_password);
  console.log(await checkEmailExists(user_email));
  if ((await checkEmailExists(user_email))) {
    res.json({ user_registered: false, message: "User already exists" });
  } else {
    let hashedPassword = bcrypt.hashSync(user_password, 10);
    const createdUser = await prisma.user.create({
      data: {
        user_name: user_name,
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
