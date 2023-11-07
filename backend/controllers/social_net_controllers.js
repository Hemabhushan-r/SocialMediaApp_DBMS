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

exports.followProfile = followProfile;

exports.unFollowProfile = unFollowProfile;
