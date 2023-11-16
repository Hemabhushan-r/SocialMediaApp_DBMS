const express = require("express");
const router = express.Router();
const {
  signIn,
  signUp,
  editProfile,
  searchPeople,
  viewFeed,
  viewOwnPosts,
  viewProfile,
  viewProfileByProfileId,
  getUserFollowerStatus,
} = require("../controllers/user_controllers");

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/editprofile", editProfile);
router.post("/searchprofile", searchPeople);
router.post("/feed", viewFeed);
router.post("/ownprofileposts", viewOwnPosts);
router.post("/viewprofile", viewProfile);
router.post("/viewprofilebyprofileid", viewProfileByProfileId);
router.post("/getuserfollowerstatus", getUserFollowerStatus);

module.exports = router;
