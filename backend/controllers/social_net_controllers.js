const mysql = require("mysql2");
const db_config = require("../db.config.js");
const util = require("util");
const db = require("../sqldb.js");

const query = util.promisify(db.query).bind(db);

const followProfile = async (req, res) => {
  const { followerprofileid, followedprofileid } = req.body;
  try {
    //connection.connect();
    const addFollowRes = await query(
      "INSERT INTO follower (followerprofileid,followedprofileid) VALUES (?,?)",
      [followerprofileid, followedprofileid]
    );
    res.status(200).json({ message: "Follower Added Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const unFollowProfile = async (req, res) => {
  const { followerprofileid, followedprofileid } = req.body;
  try {
    //connection.connection();
    const removeFollowRes = await query(
      "DELETE FROM follower WHERE followerprofileid = ? and followedprofileid = ?",
      [followerprofileid, followedprofileid]
    );
    res.status(200).json({ message: "Follower Removed Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const followerCount = async (req, res) => {
  const { email } = req.body;
  try {
    const followerNum = await query(
      "SELECT total_followers((SELECT profileid FROM user_auth WHERE email = ?)) as followercount",
      [email]
    );
    res.status(200).json({ followerNum: followerNum });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
    throw new Error(err);
  }
};

const followedCount = async (req, res) => {
  const { email } = req.body;
  try {
    const followedNum = await query(
      "SELECT total_followed((SELECT profileid FROM user_auth WHERE email = ?)) as followedcount",
      [email]
    );
    res.status(200).json({ followedNum: followedNum });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
    throw new Error(err);
  }
};

exports.followProfile = followProfile;

exports.unFollowProfile = unFollowProfile;

exports.followerCount = followerCount;

exports.followedCount = followedCount;
