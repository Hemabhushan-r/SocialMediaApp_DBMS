import React, { useEffect, useState } from "react";
import StatusBar from "./StatusBar";
import Post from "./Post";
import axios from "axios";

const HomeContent = () => {
  const [photoPosts, setPhotoPosts] = useState([]);
  const [videoPosts, setVideoPosts] = useState([]);
  const [curruserEmail, setCurrUserEmail] = useState("");
  useEffect(() => {
    (async () => {
      const userEmail = localStorage.getItem("email");
      setCurrUserEmail((prev) => userEmail);
      try {
        const url = "http://localhost:5000/user/feed";
        const data = { email: userEmail };
        const response = await axios.post(url, data);
        console.log(response);
        setPhotoPosts((prev) => response?.data?.photos);
        setVideoPosts((prev) => response?.data?.videos);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="col-8 offset-2">
      <StatusBar />
      {photoPosts.concat(videoPosts).map((post, index) => (
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
    </div>
  );
};

export default HomeContent;
