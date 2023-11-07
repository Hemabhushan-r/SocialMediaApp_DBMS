const express = require("express");
const router = express.Router();
const {
  addMessage,
  removeMessage,
  retrieveChat,
  retrieveMessagesWithProfile,
} = require("../controllers/message_controllers");

router.post("/addmessage", addMessage);
router.post("/removemessage", removeMessage);
router.post("/getallchats", retrieveChat);
router.post("/getchat", retrieveMessagesWithProfile);

module.exports = router;
