const express = require("express");
const router = express.Router();
const {
  createPhotoPost,
  createVideoPost,
  deletePhotoPost,
  deleteVideoPost,
  reactToPhoto,
  reactToVideo,
  removeReaction,
  updatePhotoPost,
  updateVideoPost,
} = require("../controllers/post_controllers");

router.post("/createphoto", createPhotoPost);
router.post("/createvideo", createVideoPost);
router.post("/delphoto", deletePhotoPost);
router.post("/delvideo", deleteVideoPost);
router.post("/reactphoto", reactToPhoto);
router.post("/reactvideo", reactToVideo);
router.post("/removereact", removeReaction);
router.post("/updatephoto", updatePhotoPost);
router.post("/updatevideo", updateVideoPost);

module.exports = router;
