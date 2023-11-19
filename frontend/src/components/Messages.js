import { AiOutlineSend } from "react-icons/ai";
import Chats from "./Chats";
import ChatMessages from "./ChatMessages";
import { useState } from "react";
import axios from "axios";

const Messages = () => {
  const [currActiveChatProfileId, setCurrActiveChatProfileId] = useState("");
  const [message, setMessage] = useState("");
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    try {
      const url = "http://localhost:5000/message/addmessage";
      const data = {
        email: email,
        receiverprofileid: currActiveChatProfileId,
        message: message,
      };
      const response = await axios.post(url, data);
      setMessage((prev) => "");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="col-8 offset-2">
      <div className="row container-fluid px-0">
        <div className="col-4 border-end vh-100 text-start">
          <h4 className="my-2 border-bottom">Chat</h4>
          <Chats
            currActiveChatProfileId={currActiveChatProfileId}
            setCurrActiveChatProfileId={setCurrActiveChatProfileId}
          />
        </div>
        <div className="position-relative col-8 vh-100">
          {currActiveChatProfileId === "" ? (
            <></>
          ) : (
            <ChatMessages
              currActiveChatProfileId={currActiveChatProfileId}
              setCurrActiveChatProfileId={setCurrActiveChatProfileId}
            />
          )}
          <div className="position-absolute bottom-0 input-group my-3 shadow rounded">
            <input
              type="text"
              className="form-control"
              placeholder="Type Message"
              aria-label="Type Message"
              aria-describedby="button-addon2"
              style={{ minHeight: "4rem" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              <AiOutlineSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
