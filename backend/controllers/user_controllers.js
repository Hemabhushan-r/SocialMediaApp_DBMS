const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db_config = require("../db.config.js");
const util = require("util");
const db = require("../sqldb.js");

const query = util.promisify(db.query).bind(db);

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    //connection.connect();

    const queryRes = await query("SELECT * FROM user_auth WHERE email=?", [
      email,
    ]);
    if (queryRes.length == 0) {
      return res
        .status(404)
        .json({ message: "User does not exist with email " + email });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      queryRes[0]["password"]
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Passsword" });
    }
    const token = jwt.sign(
      { email: queryRes[0]["email"], id: queryRes[0]["profileid"] },
      "test",
      { expiresIn: "24h" }
    );
    res.status(200).json({ token });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    throw new Error(err);
  }
};

const signUp = async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword, dob, gender } =
    req.body;
  try {
    //connection.connect();
    const existingUser = await query("SELECT * FROM user_auth WHERE email=?", [
      email,
    ]);
    if (existingUser.length != 0) {
      return res
        .status(400)
        .json({ message: "User already exists Please Sign In" });
    }
    if (password != confirmpassword) {
      return res.status(400).json({ message: "Passwords dont'match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await query(
      "INSERT INTO user_auth (email,password) VALUES (?,?)",
      [email, hashedPassword]
    );
    const profileUser = await query(
      "UPDATE profile SET firstname = ?, lastname = ?, birthday =  ?, gender =  ? WHERE profileid = ?",
      [firstname, lastname, dob, gender, createdUser["insertId"]]
    );
    const token = jwt.sign(
      { email: email, id: createdUser["insertId"] },
      "test",
      { expiresIn: "24h" }
    );
    res.status(200).json({ token });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    throw new Error(err);
  }
};

const viewProfile = async (req, res) => {
  const { email } = req.body;
  try {
    //connection.connect();
    const profileRes = await query(
      "SELECT * FROM profile WHERE profileid=(SELECT profileid FROM user_auth WHERE email = ?)",
      [email]
    );
    res.status(200).json({ ...profileRes[0] });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const viewProfileByProfileId = async (req, res) => {
  const { profileid } = req.body;
  try {
    //connection.connect();
    const profileRes = await query("SELECT * FROM profile WHERE profileid=?", [
      profileid,
    ]);
    res.status(200).json({ ...profileRes[0] });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const editProfile = async (req, res) => {
  const {
    email,
    aboutme,
    firstname,
    lastname,
    birthday,
    schoolcount,
    workcount,
    gender,
  } = req.body;
  try {
    //connection.connect();
    const profileUpdate = await query(
      "UPDATE profile SET aboutme = ?, firstname = ?, lastname = ?,birthday = ?,schoolcount = ?,workcount = ?,gender = ? WHERE profileid = (SELECT profileid FROM user_auth WHERE email = ?)",
      [
        aboutme,
        firstname,
        lastname,
        birthday,
        schoolcount,
        workcount,
        gender,
        email,
      ]
    );
    res.status(200).json({ message: "Profile Updated Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const viewFeed = async (req, res) => {
  const { email } = req.body;
  try {
    //connection.connect();
    const photoRes = await query(
      "SELECT * FROM photo WHERE postedbyprofileid=(SELECT followedprofileid FROM follower WHERE followerprofileid=(SELECT profileid FROM user_auth WHERE email = ?))",
      [email]
    );
    const videoRes = await query(
      "SELECT * FROM video WHERE postedbyprofileid=(SELECT followedprofileid FROM follower WHERE followerprofileid=(SELECT profileid FROM user_auth WHERE email = ?))",
      [email]
    );
    res.status(200).json({ photos: photoRes, videos: videoRes });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const viewOwnPosts = async (req, res) => {
  const { email } = req.body;
  try {
    //connection.connect();
    const photoRes = await query(
      "SELECT * FROM photo WHERE postedbyprofileid=(SELECT profileid FROM user_auth WHERE email = ?)",
      [email]
    );
    const videoRes = await query(
      "SELECT * FROM video WHERE postedbyprofileid=(SELECT profileid FROM user_auth WHERE email = ?)",
      [email]
    );
    res.status(200).json({ photos: photoRes, videos: videoRes });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const searchPeople = async (req, res) => {
  let { search } = req.body;
  try {
    //connection.connect();
    search = "%" + search + "%";
    const searchRes = await query(
      "SELECT * FROM profile WHERE (firstname like ?) OR (lastname like ?)",
      [search, search]
    );
    let data;
    if (search != "%%") {
      data = { searchRes: searchRes };
    } else {
      data = { searchRes: [] };
    }
    res.status(200).json(data);
    //connection.end();
  } catch (err) {
    throw new Error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserFollowerStatus = async (req, res) => {
  const { email } = req.body;
  try {
    const statusRes = await query(
      "SELECt * FROM userstatus WHERE profileid=(SELECT followedprofileid FROM follower WHERE followerprofileid=(SELECT profileid FROM user_auth WHERE email=?))",
      [email]
    );
    res.status(200).json({ statusRes: statusRes });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signIn = signIn;

exports.signUp = signUp;

exports.viewProfile = viewProfile;
exports.viewProfileByProfileId = viewProfileByProfileId;

exports.editProfile = editProfile;

exports.viewFeed = viewFeed;

exports.viewOwnPosts = viewOwnPosts;

exports.searchPeople = searchPeople;

exports.getUserFollowerStatus = getUserFollowerStatus;
