import { useState, useEffect } from "react";
import axios from "axios";

const Status = ({ imgurl, username, profileid, statustext, srcurl }) => {
  const [userImgUrl, setUserImgUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [reactions, setReactions] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const url = "http://localhost:5000/user/viewprofilebyprofileid";
        const data = { profileid: profileid };
        const response = await axios.post(url, data);
        setUserName(
          (prev) =>
            response?.data?.FirstName + "\t\t" + response?.data?.LastName
        );
        setUserImgUrl((prev) => response?.data?.PictureURL);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div>
      <div className="row text-center">
        <div>
          <img
            src={userImgUrl ? userImgUrl : imgurl}
            style={{ maxHeight: "4em", maxWidth: "4em" }}
            className="rounded-circle"
          />
        </div>
        <div className="text-center">{userName ? userName : username}</div>
      </div>
    </div>
  );
};

export default Status;
