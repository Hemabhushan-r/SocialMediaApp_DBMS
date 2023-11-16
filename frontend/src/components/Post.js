import axios from "axios";
import { useEffect, useState } from "react";
import { BiLike, BiSad } from "react-icons/bi";
import { BsEmojiLaughing, BsEmojiAngry } from "react-icons/bs";
import { FaRegSadCry, FaRegSurprise } from "react-icons/fa";

const Post = ({
  userimgurl,
  imgurl,
  username,
  timestamp,
  caption,
  postedbyprofileid,
  postid,
  isPhoto,
}) => {
  const [userImgUrl, setUserImgUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [reactions, setReactions] = useState([]);
  const [myReactionId, setMyReactionId] = useState("");

  const handleReaction = async (reactionType) => {
    const email = localStorage.getItem("email");
    let url;
    if (myReactionId == "") {
      if (isPhoto) {
        url = "http://localhost:5000/post/reactphoto";
      } else {
        url = "http://localhost:5000/post/reactvideo";
      }
      const data = { postid: postid, email: email, reactiontype: reactionType };
      const response = await axios.post(url, data);
      setMyReactionId((prev) => response?.data?.insertId);
    } else {
      url = "http://localhost:5000/post/updatereact";
      const data = { reactiontype: reactionType, reactionid: myReactionId };
      const response2 = await axios.post(url, data);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const url = "http://localhost:5000/user/viewprofilebyprofileid";
        const data = { profileid: postedbyprofileid };
        const response = await axios.post(url, data);
        setUserName(
          (prev) =>
            response?.data?.FirstName + "\t\t" + response?.data?.LastName
        );
        setUserImgUrl((prev) => response?.data?.PictureURL);
        let url2;
        if (isPhoto) {
          url2 = "http://localhost:5000/post/getreactphoto";
        } else {
          url2 = "http://localhost:5000/post/getreactvideo";
        }
        const data2 = { postid: postid };
        const response2 = await axios.post(url2, data2);
        setReactions((prev) => response2?.data?.reactRes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="d-flex justify-content-center text-start my-4">
      <div className="card shadow-lg" style={{ width: "30rem" }}>
        <div className="d-flex m-2 align-middle">
          <img
            src={userImgUrl ? userImgUrl : userimgurl}
            style={{ maxHeight: "2em", maxWidth: "2em" }}
            className="rounded-circle"
          />
          <div className="card-title m-2">
            {userName ? userName : username}
            {"  "}
            {timestamp}
          </div>
        </div>
        <img src={imgurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <div>
            <div className="btn-group dropend">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleReaction("Like");
                }}
                className="align-middle"
              >
                <BiLike className="fs-3" />
              </div>
              <div
                type="button"
                className="dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle Dropright</span>
              </div>
              <ul className="dropdown-menu" style={{ minWidth: "12rem" }}>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    handleReaction("Laugh");
                  }}
                  className="d-inline-block mx-1"
                >
                  <BsEmojiLaughing className="fs-3" />
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    handleReaction("Cry");
                  }}
                  className="d-inline-block mx-1"
                >
                  <FaRegSadCry className="fs-3" />
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    handleReaction("Wow");
                  }}
                  className="d-inline-block mx-1"
                >
                  <FaRegSurprise className="fs-3" />
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    handleReaction("Angry");
                  }}
                  className="d-inline-block mx-1"
                >
                  <BsEmojiAngry className="fs-3" />
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    handleReaction("Sad");
                  }}
                  className="d-inline-block mx-1"
                >
                  <BiSad className="fs-2" />
                </li>
              </ul>
            </div>
          </div>
          <p className="card-text">{caption}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
