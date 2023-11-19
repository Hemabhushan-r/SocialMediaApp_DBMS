import axios from "axios";
import { useEffect, useState } from "react";
import SuggestedProfile from "./SuggestedProfile";

const RightBar = ({ userimgurl, username }) => {
  const [userImgUrl, setUserImgUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [unfollowedProfiles, setUnfollowedProfiles] = useState([]);
  const [myProfileId, setMyProfileId] = useState("");
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem("email");
      try {
        const url = "http://localhost:5000/user/viewprofile";
        const data = { email: email };
        const response = await axios.post(url, data);
        setUserImgUrl((prev) => response?.data?.PictureURL);
        setUserName(
          (prev) => response?.data?.FirstName + " " + response?.data?.LastName
        );
        setMyProfileId((prev) => response?.data?.profileid);
      } catch (err) {
        console.log(err);
      }
    })();

    (async () => {
      const email = localStorage.getItem("email");
      try {
        const url = "http://localhost:5000/user/getunfollowedprofiles";
        const data = { email: email };
        const response = await axios.post(url, data);
        setUnfollowedProfiles((prev) => response?.data?.profileRes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="col-2 border-start border-2 shadow offset-10 vh-100 position-fixed">
      <div className="d-flex justify-content-left mx-2 my-3">
        <span className="me-3">
          {
            <img
              src={userImgUrl ? userImgUrl : userimgurl}
              style={{ maxHeight: "2em", maxWidth: "2em" }}
              className="rounded-circle"
            />
          }
        </span>{" "}
        <span className="fs-5 align-text-middle">
          {userName ? userName : username}
        </span>
      </div>
      <div>
        {unfollowedProfiles.map((profile, index) => (
          <SuggestedProfile
            profileid={profile.profileid}
            userimgurl={profile.PictureURL}
            username={profile.FirstName + " " + profile.LastName}
            myprofileid={myProfileId}
          />
        ))}
      </div>
    </div>
  );
};

export default RightBar;
