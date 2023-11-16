import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const Profile = ({ userimgurl, username }) => {
  const [profileData, setProfileData] = useState({});
  const [ownPosts, setOwnPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem("email");
      try {
        const url = "http://localhost:5000/user/viewprofile";
        const data = { email: email };
        const response = await axios.post(url, data);
        setProfileData((prev) => response?.data);
        const url2 = "http://localhost:5000/user/ownprofile";
        const response2 = await axios.post(url2, data);
        setOwnPosts((prev) =>
          response2?.data?.photos.concat(response2?.data?.videos)
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="col-8 offset-2">
      <div className="row mt-3 pb-5 border-bottom">
        <div className="col-4">
          <img
            src={profileData?.PictureURL ? profileData?.PictureURL : userimgurl}
            style={{ maxHeight: "4em", maxWidth: "4em" }}
            className="rounded-circle"
          />
        </div>
        <div className="col-8">
          <div className="d-flex justify-content-left">
            <span className="fs-5 me-2">
              {profileData?.FirstName}
              {"    "}
            </span>
            <span className="fs-5 me-2">{profileData?.LastName}</span>
            <span className="fs-6">{profileData?.Gender}</span>
          </div>
          <div className="d-flex justify-content-left">
            <span className="fs-6">About Me : {profileData?.AboutMe}</span>
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
        />
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
