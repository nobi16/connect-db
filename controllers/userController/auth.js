const User = require("../../models/user");
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const existuser = await User.findById(req.userName);
  console.log(existuser);
  if (!existuser) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg
      })
    } else {
      const user = new User(req.body);
      console.log(user);
      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            message: "User already registered or something went wrong"
          });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        // // put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 })

        // res.json({
        //   token: token,
        //   name: user.name,
        //   userName: user.userName,
        //   id: user._id
        // });
        // // send response to frontend
        // const { _id, name, userName } = user
        return res.json({ token, user: { _id: user._id, name: user.name, userName: user.userName } })

      });
    }
  } else {
    return res.status(400).json({
      message: "User already registered"
    });
  }


};

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg
    })
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.userName = req.body.userName || user.userName;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.SECRET)
    // // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 })
    return res.json({ token, user: { _id: updatedUser._id, name: updatedUser.name, userName: updatedUser.userName } })

  } else {
    return res.status(400).json({
      message: "User Not Found"
    })
  }
}

exports.signin = (req, res) => {
  const { userName, password } = req.body
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg
    })
  }

  User.findOne({ userName }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        message: "USER does not exist"
      })
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        message: "Username and Password does not match"
      })
    }

    // create json web token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET)

    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 })

    // send response to frontend
    const { _id, name, userName } = user
    return res.json({ token, user: { _id, name, userName } })
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "User signout success"
  });
};


