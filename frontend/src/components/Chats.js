import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./Chat";

const Chats = ({ currActiveChatProfileId, setCurrActiveChatProfileId }) => {
  const [chats, setChats] = useState([]);
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem("email");
      try {
        const url = "http://localhost:5000/message/getallchats";
        const data = { email: email };
        const response = await axios.post(url, data);
        setChats((prev) => response?.data?.messages);
      } catch (err) {
        console.log(err);
      } finally {
        if (currActiveChatProfileId == "") {
          setCurrActiveChatProfileId((prev) => chats[0]?.receiverprofileid);
        }
      }
    })();
  }, []);
  return (
    <div className="">
      <ul className="list-group">
        {chats.map((chat, index) => (
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
        ))}
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
