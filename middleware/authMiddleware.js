const jwt = require("jsonwebtoken");
const Business = require("../models/business");
const User = require("../models/user");
exports.isSignedIn = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(decoded._id);
      if (req.user !== null) {
        next();
      } else {
        return res.status(400).json({
          error: "Not authorized, token failed1"
        })
      }

    } catch (error) {
      return res.status(400).json({
        error: "Not authorized, token failed2"
      })
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
}

exports.getServices = async (req, res, next) => {
console.log(req);
  req.business = await Business.findById(req.business_id);
  if (req.user !== null) {
    next();
  } else {
    return res.status(400).json({
      error: "Not get business failed1"
    })
  }

}

