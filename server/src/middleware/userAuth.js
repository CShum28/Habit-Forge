const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  const token = req.cookies.jwt;
  console.log("##", token);
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
}

module.exports = userAuth;
