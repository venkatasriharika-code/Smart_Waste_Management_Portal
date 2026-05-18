const { prisma } = require("../utils/dbConnector");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function resolveRole(req) {
  return req.role || req.body?.role || "user";
}

exports.userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const role = resolveRole(req);

  if (!name || !email || !password) {
    return res.status(400).send({
      message: "Name, email, and password are required",
      status: false,
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const userData = await prisma.User.create({
      data: {
        name,
        email,
        role,
        password: hashPassword,
      },
    });

    res.status(201).send({
      message: `${role} account created`,
      status: true,
      data: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (err) {
    res.status(400).send({
      message: err.message || "Registration failed",
      status: false,
    });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const role = resolveRole(req);

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required",
      status: false,
    });
  }

  if (!process.env.JWT_SECRET_TOKEN) {
    return res.status(500).send({
      message: "Server misconfiguration: JWT_SECRET_TOKEN is not set",
      status: false,
    });
  }

  try {
    const validUser = await prisma.User.findFirst({
      where: { email, role },
    });

    if (!validUser) {
      return res.status(401).send({
        message: "User doesn't exist",
        status: false,
      });
    }

    const validPass = await bcrypt.compare(password, validUser.password);
    if (!validPass) {
      return res.status(401).send({
        message: "Wrong password",
        status: false,
      });
    }

    const token = jwt.sign(
      { id: validUser.id, email, role: validUser.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: `${role} login successful`,
      status: true,
      data: {
        id: validUser.id,
        name: validUser.name,
        email: validUser.email,
        role: validUser.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      message: err.message || "Login failed",
      status: false,
    });
  }
};

// Legacy exports kept for any external references
exports.adminRegister = exports.userRegister;
exports.adminLogin = exports.userLogin;

exports.adminChangePass = async (req, res) => {
  const adminId = req.params.id;
  const { newPass } = req.body;

  if (!newPass) {
    return res.status(400).send({ status: false, message: "newPass is required" });
  }

  try {
    const hashPassword = await bcrypt.hash(newPass, 10);
    const updateData = await prisma.User.update({
      where: { id: adminId },
      data: { password: hashPassword },
    });
    res.status(201).send({ status: true, message: "Password updated", data: updateData.id });
  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
  }
};
