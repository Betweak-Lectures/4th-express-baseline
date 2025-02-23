const express = require("express");
const User = require("../../models/User");
const router = express.Router();

const { createToken, verifyToken } = require("../../utils/auth");

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.signUp(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
      message: "이미 로그인 되어 있습니다.",
    });
    return;
  }
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);

    user.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
    });

    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(403);
    next(err);
  }
});

router.all("/logout", async (req, res, next) => {
  // cookie 삭제
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

module.exports = router;
