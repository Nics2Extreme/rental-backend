const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const userId = foundUser.id;
    const unit = foundUser.unit;
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ userId, roles, accessToken, unit });
  } else {
    res.sendStatus(401);
  }
};

const changePass = async (req, res) => {
  const { user, pwd, newPwd, confirmPwd } = req.body;
  if (!pwd) return res.status(400).json({ message: "Password is required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  if (newPwd !== confirmPwd) return res.sendStatus(401);
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const hashedPwd = await bcrypt.hash(newPwd, 10);
    const update = await User.findOneAndUpdate(
      { username: user },
      { $set: { password: hashedPwd } },
      { new: true }
    ).exec();
    console.log(update.password);
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin, changePass };
