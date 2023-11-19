const express = require("express");
const router = express.Router();
const {
  followProfile,
  unFollowProfile,
  followerCount,
  followedCount,
} = require("../controllers/social_net_controllers");

router.post("/follow", followProfile);
router.post("/unfollow", unFollowProfile);
router.post("/getfollowercount", followerCount);
router.post("/getfollowedcount", followedCount);

module.exports = router;
