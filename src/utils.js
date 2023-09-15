// const pool = require("../db");
const queries = require("./users/queries");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {PrismaClient} = require('@prisma/client')
// const { prisma } = require("../prisma/prisma-client");

dotenv.config();

const prisma = new PrismaClient();

const checkEmailExists = async (email) => {
  // const email_data = await pool.query(queries.checkEmailExists, [email]);
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });

    return user; // If a user is found, it will be returned; otherwise, null is returned.
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const getUserId = async (email) => {
  console.log(email);
  const user_data = await pool.query(queries.getUserId, [email]);
  console.log(user_data.rows);
  return user_data.rows[0].user_id;
};

function generateAccessToken(user_id) {
  return jwt.sign({ user_id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

module.exports = { checkEmailExists, generateAccessToken, getUserId };
