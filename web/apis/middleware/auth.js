const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  if (!token.includes("Bearer ")) {
    return res.status(403).send("A token is not in specified format");
  }
  
  try {
	const bearerToken = token.split(' ')[1];
    const decoded = jwt.verify(bearerToken, config.API_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;