const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = "privateKey";
const saltRounds = 10;

router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

router.post("/register", async function(req, res, next) {
  if (req.body.username && req.body.password) {
    const { username } = req.body
    const user = new User({ username, password: req.hashedPassword })

    return await user.save().then((savedUser) => {
      return res.status(201).json({
        id: savedUser.id,
        username: savedUser.username
      })
    }).catch((err) => res.status(500).json({ error: err.message }))
  } else {
    res.status(400).json({ error: "Username or Password Missing" })
  }
})

router.post("/login", async function(req, res, next) {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body
    const user = await User.findOne().where("username").equals(username).exec()
    if (user) {
      return bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256"
            })

            return res.status(200).json({ access_token: token })
          } else {
            return res.status(401).json({ error: "Incorrect username or password" })
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        })
    }
    return res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
})

module.exports = router