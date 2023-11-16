import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

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
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);
  return (
    <div className="col-8 offset-2 vh-100">
      <div className="card shadow mt-5">
        <div
          className="mx-auto border shadow-lg my-1"
          style={{ width: "25rem" }}
        >
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={myImage}
            plugins={[responsive(), placeholder()]}
          />
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
        <button
          className="btn btn-secondary m-2"
          type="button"
          id="button-addon2"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Create;
