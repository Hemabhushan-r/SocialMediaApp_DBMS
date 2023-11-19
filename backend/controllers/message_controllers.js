const mysql = require("mysql2");
const util = require("util");
const db_config = require("../db.config.js");

const db = require("../sqldb.js");

const query = util.promisify(db.query).bind(db);

const addMessage = async (req, res) => {
  const { email, receiverprofileid, message } = req.body;
  try {
    //connection.connect();
    const insertMessageRes = await query(
      "INSERT INTO message (senderprofileid,receiverprofileid,Message) VALUES ((SELECT profileid FROM user_auth WHERE email = ?),?,?)",
      [email, receiverprofileid, message]
    );
    res.status(200).json({
      message: "Message Added Successfully",
      insertId: insertMessageRes["insertId"],
    });
    //connection.end();
  } catch (err) {
    throw new Error(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const removeMessage = async (req, res) => {
  const { messageid } = req.body;
  try {
    //connection.connect();
    const delRes = await query("DELETE FROM message WHERE messageid = ?", [
      messageid,
    ]);
    res.status(200).json({ message: "Message Deleted Successfully" });
    //connection.end();
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const retrieveChat = async (req, res) => {
  const { email } = req.body;
  try {
    //connection.connect();
    const messageRes = await query(
      "SELECT distinct m.receiverprofileid,m.Message,m.mes_timestamp,p.FirstName,p.LastName FROM message m RIGHT JOIN profile p ON p.profileid=m.receiverprofileid WHERE m.senderprofileid = (SELECT u.profileid FROM user_auth u WHERE u.email = ?) ORDER BY m.mes_timestamp DESC",
      [email]
    );
    res.status(200).json({ messages: messageRes });
    //connection.end();
  } catch (err) {
    throw new Error(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const retrieveMessagesWithProfile = async (req, res) => {
  const { email, chatwithprofileid } = req.body;
  try {
    //connection.connect();
    const messageRes = await query(
      "SELECT m.senderprofileid,m.messageid,m.Message,m.mes_timestamp,p.FirstName,p.LastName FROM message m INNER JOIN profile p ON p.profileid=m.senderprofileid WHERE (m.senderprofileid = ? AND m.receiverprofileid = (SELECT profileid FROM user_auth u WHERE u.email = ?)) OR (m.senderprofileid = (SELECT profileid FROM user_auth u WHERE u.email = ?) AND m.receiverprofileid = ?) GROUP BY m.senderprofileid,p.FirstName,m.messageid,m.Message,m.mes_timestamp ORDER BY m.mes_timestamp",
      [chatwithprofileid, email, email, chatwithprofileid]
    );
    res.status(200).json({ messages: messageRes });
    //connection.end();
  } catch (err) {
    throw new Error(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.addMessage = addMessage;

exports.removeMessage = removeMessage;

exports.retrieveChat = retrieveChat;

exports.retrieveMessagesWithProfile = retrieveMessagesWithProfile;
