const User = require("../model/User");
const bcrypt = require("bcrypt");
const Unit = require("../model/Unit");
const fs = require("fs").promises;

const handleNewUser = async (req, res) => {
  const { user, pwd, fname, lname, occ, phone, email, address, unit } =
    req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //upload image
    const fileType = req.file.mimetype.split("/")[1];
    const newFileName = req.file.originalname.split(".")[0] + "." + fileType;

    fs.rename(
      `./public/img/${req.file.filename}`,
      `./public/img/${newFileName}`
    );

    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
      fname: fname,
      lname: lname,
      occ: occ,
      phoneno: phone,
      email: email,
      address: address,
      unit: unit,
    });

    const userId = result._id;

    const update = await Unit.findOneAndUpdate(
      { _id: unit },
      { $set: { tenant: userId, unitAvailability: false } },
      { new: true }
    );

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
