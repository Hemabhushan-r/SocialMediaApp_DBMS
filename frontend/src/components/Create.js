import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  AdvancedImage,
  responsive,
  placeholder,
  AdvancedVideo,
} from "@cloudinary/react";
import axios from "axios";

const Create = () => {
  const [caption, setCaption] = useState("");
  const [imgSecureUrl, setImgSecureUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("djqrkesfu");
  const [uploadPreset] = useState("ljuq7dop");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });
  const [selectedMediaType, setSelectedMediaType] = useState("Photo");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const handlePost = async (e) => {
    const email = localStorage.getItem("email");
    try {
      let url;
      if (selectedMediaType === "Photo") {
        url = "http://localhost:5000/post/createphoto";
      } else {
        url = "http://localhost:5000/post/createvideo";
      }
      const data = { email: email, caption: caption, link: imgSecureUrl };
      const response = await axios.post(url, data);
      setPublicId((prev) => "");
      setImgSecureUrl((prev) => "");
      setCaption((prev) => "");
    } catch (err) {
      console.log(err);
    }
  };
  /* { caption, email, link }*/
  const myImage = cld.image(publicId);
  const myVideo = cld.video(publicId);
  return (
    <div className="col-8 offset-2 vh-100">
      <div className="card shadow mt-5">
        <div
          className="mx-auto border shadow-lg my-1"
          style={{ width: "25rem" }}
        >
          {selectedMediaType === "Photo" ? (
            <AdvancedImage
              style={{ maxWidth: "100%" }}
              cldImg={myImage}
              plugins={[responsive(), placeholder()]}
            />
          ) : (
            <AdvancedVideo
              style={{ maxWidth: "100%" }}
              cldVid={myVideo}
              plugins={[responsive(), placeholder()]}
            />
          )}
        </div>
        <CloudinaryUploadWidget
          setImgSecureUrl={setImgSecureUrl}
          uwConfig={uwConfig}
          setPublicId={setPublicId}
        />
        {/* <iframe
          src={
            "https://drive.google.com/file/d/1JppX469ibYNhffvgDFCbMoAz_XqJ15g9/preview"
          }
          className=""
          style={{ minHeight: "22rem" }}
        ></iframe>
        <div class="mx-2 mb-2">
          <label for="formFile" class="form-label">
            Upload Image or Video
          </label>
          <input class="form-control" type="file" id="formFile" />
        </div> */}
        <div className="form-floating m-2">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            value={caption}
            onChange={(e) => setCaption((prev) => e.target.value)}
          ></textarea>
          <label for="floatingTextarea2">Caption</label>
        </div>
        <div className="row container-fluid">
          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="Photo"
                checked={selectedMediaType === "Photo"}
                onChange={(e) => setSelectedMediaType((prev) => e.target.value)}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Photo
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="Video"
                checked={selectedMediaType === "Video"}
                onChange={(e) => setSelectedMediaType((prev) => e.target.value)}
              />
              <label className="form-check-label" for="flexRadioDefault2">
                Video
              </label>
            </div>
          </div>
        </div>
        <button
          className="btn btn-secondary m-2"
          type="button"
          id="button-addon2"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Create;
