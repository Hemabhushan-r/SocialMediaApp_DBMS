import axios from "axios";
import { useState } from "react";

const SuggestedProfile = ({ userimgurl, username, profileid, myprofileid }) => {
  const [isFollower, setIsFollower] = useState(false);
  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      let url;
      if (!isFollower) {
        url = "http://localhost:5000/socialnet/follow";
      } else {
        url = "http://localhost:5000/socialnet/unfollow";
      }
      const data = {
        followerprofileid: myprofileid,
        followedprofileid: profileid,
      };
      const response = await axios.post(url, data);
      setIsFollower((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card d-flex py-2">
      <div>
        <img className="card-img-left" src={userimgurl} />
      </div>
      <div className="card-title">{username}</div>
      <div>
        <button onClick={handleFollow} className="btn btn-secondary">
          {!isFollower ? "Follow" : "Unfollow"}
        </button>
      </div>
    </div>
  );
};

export default SuggestedProfile;
