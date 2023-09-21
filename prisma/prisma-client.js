// prisma.js (or any appropriate name)
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({ log: ["error"] });

module.exports = prisma;
