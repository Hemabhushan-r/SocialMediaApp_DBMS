import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ userimgurl, username }) => {
  const [profileData, setProfileData] = useState({});
  const [ownPosts, setOwnPosts] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followedCount, setFollowedCount] = useState(0);
  const navigate = useNavigate();
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    try {
      const url = "http://localhost:5000/user/deleteaccount";
      const data = { email: email };
      const response = await axios.post(url, data);
      localStorage.removeItem("email");
      localStorage.removeItem("auth_token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem("email");
      try {
        const url = "http://localhost:5000/user/viewprofile";
        const data = { email: email };
        const response = await axios.post(url, data);
        const url2 = "http://localhost:5000/user/ownprofileposts";
        const response2 = await axios.post(url2, data);
        const url3 = "http://localhost:5000/socialnet/getfollowercount";
        const response3 = await axios.post(url3, data);
        const url4 = "http://localhost:5000/socialnet/getfollowedcount";
        const response4 = await axios.post(url4, data);
        setProfileData((prev) => response?.data);
        setOwnPosts((prev) =>
          response2?.data?.photos.concat(response2?.data?.videos)
        );
        setFollowerCount(
          (prev) => response3?.data?.followerNum[0]?.followercount
        );
        setFollowedCount(
          (prev) => response4?.data?.followedNum[0]?.followedcount
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="col-8 offset-2">
      <div className="row mt-3 pb-5 border-bottom">
        <div className="col-3">
          <img
            src={profileData?.PictureURL ? profileData?.PictureURL : userimgurl}
            style={{ maxHeight: "4em", maxWidth: "4em" }}
            className="rounded-circle"
          />
        </div>
        <div className="col-7">
          <div className="d-flex justify-content-left">
            <span className="fs-5 me-2">
              {profileData?.FirstName}
              {"    "}
            </span>
            <span className="fs-5 me-2">{profileData?.LastName}</span>
            <span className="fs-6 ms-4">{profileData?.Gender}</span>
          </div>
          <div className="d-flex justify-content-left">
            <div className="me-2">Followers {followerCount}</div>
            <div className="mx-2">Following {followedCount}</div>
          </div>
          <div className="d-flex justify-content-left">
            <span className="fs-6">About Me : {profileData?.AboutMe}</span>
          </div>
        </div>
        <div className="col-2">
          <div>
            <button onClick={handleDeleteAccount} className="btn btn-secondary">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <div className="row py-3">
        {ownPosts.map((post, index) => (
          <Post
            key={index}
            caption={post.Caption}
            imgurl={post.Link}
            timestamp={post.CreatedTimestamp}
            postedbyprofileid={post.postedbyprofileid}
            postid={post?.PhotoId ? post?.PhotoId : post?.VideoId}
            isPhoto={post?.PhotoId ? true : false}
          />
        ))}
        {/* <Post
          username={"Hemabhushan"}
          caption={"This is phot test"}
          timestamp={"5 PM"}
          userimgurl={
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          imgurl={
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
        /> */}
        {/* <Post
          username={"Hemabhushan"}
          caption={"This is phot test"}
          timestamp={"5 PM"}
          userimgurl={
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          imgurl={
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
        />
        <Post
          username={"Hemabhushan"}
          caption={"This is phot test"}
          timestamp={"5 PM"}
          userimgurl={
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          imgurl={
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
        /> */}
      </div>
    </div>
  );
};

export default Profile;
