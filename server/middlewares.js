const UserModel = require("./models/users.model");

async function authenticate(req, res, next) {
  return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Invalid Token" });
  }
  const token = authHeader.split(" ")[1];
  const buf = Buffer.from(token, "base64").toString();
  const user = buf.split(":");

  const userData = await UserModel.findOne({
    email: user[0],
    password: user[1],
  });
  if (!userData) {
    return res.status(401).send({ error: "Invalid Token" });
  }

  req.user = userData;
  next();
}

async function authorizeAdmin(req, res, next) {
  return next();
  if (!req.user || req.user.user_type !== "ADMIN") {
    return res.status(403).send({ code: 403, message: "Unauthorized Access" });
  }
  next();
}

module.exports = { authenticate, authorizeAdmin };
