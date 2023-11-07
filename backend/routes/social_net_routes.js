const express = require("express");
const router = express.Router();
const {
  followProfile,
  unFollowProfile,
} = require("../controllers/social_net_controllers");

router.post("/follow", followProfile);
router.post("/unfollow", unFollowProfile);

module.exports = router;
