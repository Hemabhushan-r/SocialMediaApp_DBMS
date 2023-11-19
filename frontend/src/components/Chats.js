import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./Chat";

const Chats = ({ currActiveChatProfileId, setCurrActiveChatProfileId }) => {
  const [chats, setChats] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem("email");

      try {
        const url = "http://localhost:5000/user/getfollowedprofiles";
        const data = { email: email };
        const response = await axios.post(url, data);
        console.log(response);
        setMyFollowers((prev) => response?.data?.profileRes);
      } catch (err) {
        console.log(err);
      }
      // try {
      //   const url = "http://localhost:5000/message/getallchats";
      //   const data = { email: email };
      //   const response = await axios.post(url, data);
      //   console.log(response);
      //   setChats((prev) => response?.data?.messages);
      // } catch (err) {
      //   console.log(err);
      // } finally {
      //   if (currActiveChatProfileId == "") {
      //     setCurrActiveChatProfileId((prev) => chats[0]?.receiverprofileid);
      //   }
      // }
    })();
  }, []);

  useEffect(() => {
    console.log(currActiveChatProfileId);
    if (
      (currActiveChatProfileId == undefined || currActiveChatProfileId == "") &&
      myFollowers.length > 0
    ) {
      console.log("here", myFollowers);
      setCurrActiveChatProfileId((prev) => myFollowers[0]?.profileid);
    }
  }, [myFollowers]);
  return (
    <div className="">
      <ul className="list-group">
        {myFollowers.map((follower, index) => (
          <Chat
            key={index}
            firstname={follower?.FirstName}
            lastname={follower?.LastName}
            message={""}
            receiverprofileid={follower?.profileid}
            isActiveChat={index == activeChatIndex}
            setCurrActiveChatProfileId={setCurrActiveChatProfileId}
            index={index}
            setActiveChatIndex={setActiveChatIndex}
          />
        ))}
        {/* {chats.map((chat, index) => (
          <Chat
            key={index}
            firstname={chat?.FirstName}
            lastname={chat?.LastName}
            message={chat?.Message}
            receiverprofileid={chat?.receiverprofileid}
            isActiveChat={index == activeChatIndex}
            setCurrActiveChatProfileId={setCurrActiveChatProfileId}
            index={index}
            setActiveChatIndex={setActiveChatIndex}
          />
        ))} */}
        {/* <li className="list-group-item active bg-secondary d-flex justify-content-between align-items-start">
          <div className="ms-1 me-auto">
            <div className="fw-bold">Subheading</div>
            Cras justo odio
          </div>
          <span className="badge bg-primary rounded-pill">14</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-1 me-auto">
            <div className="fw-bold">Subheading</div>
            Cras justo odio
          </div>
          <span className="badge bg-primary rounded-pill">14</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-1 me-auto">
            <div className="fw-bold">Subheading</div>
            Cras justo odio
          </div>
          <span className="badge bg-primary rounded-pill">14</span>
        </li> */}
      </ul>
    </div>
  );
};

export default Chats;
