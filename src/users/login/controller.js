
const { checkEmailExists } = require("../../utils");
const queries = require("../queries");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils");
const {PrismaClient} = require('@prisma/client');

const primsa = new PrismaClient();

const userLogin = async (req, res) => {
  const { user_email, user_password } = req.body;
  // console.log(req.body);
  //check if email exists
  if (await checkEmailExists(user_email)) {
    const user = await primsa.user.findUnique({
      where:{
        user_email:user_email
      }
    })
    console.log(user);
    const passwordMatch = await bcrypt.compare(user_password, user.user_password);
    if(!passwordMatch){
      console.log("wrong password");
      throw new Error('Incorrect Password')
    }
    else{
      const accessToken = generateAccessToken(user_email);
      console.log(accessToken);
      res.json({
        isAuth:true,
        message:"Logged In",
        accessToken
      })
    }
  }
}
//     pool.query(queries.getPassword, [user_email], (error, results) => {
//       if (error) throw error;
//       const databasePassword = results.rows[0].user_password;
//       // console.log(databasePassword);
//       if (bcrypt.compareSync(user_password, databasePassword)) {
//         const accessToken = generateAccessToken(user_email);
//         res.json({ isAuth: true, message: "Logged In", accessToken });
//       } else {
//         console.log("wrong password");
//         res.json({
//           isAuth: false,
//           message: "Wrong Password",
//           accessToken: null,
//         });
//       }
//     });
//   } else {
//     console.log("email doesnt exist for login");
//     res.json({
//       isAuth: false,
//       message: "Email doesnt exist",
//       accessToken: null,
//     }); // the email doesnt exist in database
//   }
// };

module.exports = { userLogin };
