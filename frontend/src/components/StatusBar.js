import { useEffect, useState } from "react";
import Status from "./Status";
import axios from "axios";

const StatusBar = () => {
  const [status, setStatus] = useState([]);
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem("email");
      try {
        const url = "http://localhost:5000/user/getuserfollowerstatus";
        const data = { email: email };
        const response = await axios.post(url, data);
        setStatus((prev) => response?.data?.statusRes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="d-flex justify-content-start my-2">
      {status.map((status, index) => (
        <Status
          srcurl={status.S_PictureURL ? status.S_PictureURL : status.S_VideoURL}
          profileid={status.profileid}
          statustext={status.StatusText}
          key={index}
        />
      ))}
      {/* <Status
        imgurl={
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        }
        username={"User 1"}
      /> */}
    </div>
  );
};

export default StatusBar;
