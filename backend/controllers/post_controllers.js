const mysql = require("mysql2");
const util = require("util");
const db_config = require("../db.config.js");
const db = require("../sqldb.js");

const query = util.promisify(db.query).bind(db);

const createPhotoPost = async (req, res) => {
  const { caption, email, link } = req.body;
  try {
    //connection.connect();
    const insertPostRes = await query(
      "INSERT INTO photo (caption,link,postedbyprofileid) VALUES (?,?,(SELECT profileid FROM user_auth WHERE email = ?))",
      [caption, link, email]
    );
    res.status(200).json({
      message: "Photo Posted Successfully",
      insertId: insertPostRes["insertId"],
    });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const updatePhotoPost = async (req, res) => {
  const { postid, caption, link } = req.body;
  try {
    //connection.connect();
    const updatePostRes = await query(
      "UPDATE photo SET caption = ?, Link = ? WHERE PhotoId = ?",
      [caption, link, postid]
    );
    res.status(200).json({ message: "Photo Updated Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const deletePhotoPost = async (req, res) => {
  const { postid } = req.body;
  try {
    //connection.connect();
    const deleteRes = await query("DELETE FROM photo WHERE PhotoId = ?", [
      postid,
    ]);
    res.status(200).json({ message: "Photo Deleted Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const createVideoPost = async (req, res) => {
  const { caption, email, link } = req.body;
  try {
    //connection.connect();
    const insertPostRes = await query(
      "INSERT INTO video (caption,link,postedbyprofileid) VALUES (?,?,(SELECT profileid FROM user_auth WHERE email = ?))",
      [caption, link, email]
    );
    res.status(200).json({
      message: "Video Posted Successfully",
      insertId: insertPostRes["insertId"],
    });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const updateVideoPost = async (req, res) => {
  const { postid, caption, link } = req.body;
  try {
    //connection.connect();
    const updatePostRes = await query(
      "UPDATE photo SET caption = ? , Link = ? WHERE VideoId = ?",
      [caption, link, postid]
    );
    res.status(200).json({ message: "Video Updated Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const deleteVideoPost = async (req, res) => {
  const { postid } = req.body;
  try {
    //connection.connect();
    const deleteRes = await query("DELETE FROM video WHERE VideoId = ?", [
      postid,
    ]);
    res.status(200).json({ message: "Video Deleted Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const reactToPhoto = async (req, res) => {
  const { postid, email, reactiontype } = req.body;
  try {
    //connection.connect();
    const reactInsertRes = await query(
      "INSERT INTO reactions (photoid,reactionbyprofileid,reactiontype) VALUES (?,(SELECT profileid FROM user_auth WHERE email = ?),?)",
      [postid, email, reactiontype]
    );
    res.status(200).json({
      message: "Reaction Added Successfully",
      insertId: reactInsertRes["insertId"],
    });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const removeReaction = async (req, res) => {
  const { reactionid } = req.body;
  try {
    //connection.connect();
    const reactDelRes = await query(
      "DELETE FROM reactions WHERE reactionid = ?",
      [reactionid]
    );
    res.status(200).json({ message: "Reaction Removed Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const reactToVideo = async (req, res) => {
  const { postid, email, reactiontype } = req.body;
  try {
    //connection.connect();
    const reactInsertRes = await query(
      "INSERT INTO reactions (videoid,reactionbyprofileid,reactiontype) VALUES (?,(SELECT profileid FROM user_auth WHERE email = ?),?)",
      [postid, email, reactiontype]
    );
    res.status(200).json({
      message: "Reaction Added Successfully",
      insertId: reactInsertRes["insertId"],
    });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.createPhotoPost = createPhotoPost;

exports.updatePhotoPost = updatePhotoPost;

exports.createVideoPost = createVideoPost;

exports.updateVideoPost = updateVideoPost;

exports.deletePhotoPost = deletePhotoPost;

exports.deleteVideoPost = deleteVideoPost;

exports.reactToPhoto = reactToPhoto;

exports.reactToVideo = reactToVideo;

exports.removeReaction = removeReaction;
