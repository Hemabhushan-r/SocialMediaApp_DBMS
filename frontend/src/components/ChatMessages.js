import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import axios from "axios";

const ChatMessages = ({
  currActiveChatProfileId,
  setCurrActiveChatProfileId,
}) => {
  const numList = [
    1, 2, 232, 43, 43, 2432, 423, 234, 342, 423, 42, 23, 242, 242, 4, 423, 4324,
    234,
  ];
  const [messages, setMessages] = useState([]);
  const [currUserProfileId, setCurrUserProfileId] = useState("");
  const [shouldRecreate, setShouldRecreate] = useState(false);
  const [currInterval, setCurrInterval] = useState("");

  const retrieveMessages = async () => {
    const email = localStorage.getItem("email");
    try {
      const url = "http://localhost:5000/message/getchat";
      const data = {
        email: email,
        chatwithprofileid: currActiveChatProfileId,
      };
      const response = await axios.post(url, data);
      //console.log(currProfId);
      setMessages((prev) => response?.data?.messages);
      const url2 = "http://localhost:5000/user/viewprofile";
      const data2 = { email: email };
      const response2 = await axios.post(url2, data2);
      setCurrUserProfileId((prev) => response2?.data?.profileid);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem("email");
      try {
        const url = "http://localhost:5000/message/getchat";
        const data = {
          email: email,
          chatwithprofileid: currActiveChatProfileId,
        };
        console.log(currActiveChatProfileId, messages);
        const response = await axios.post(url, data);
        console.log(response, messages);
        setMessages((prev) => response?.data?.messages);
        const url2 = "http://localhost:5000/user/viewprofile";
        const data2 = { email: email };
        const response2 = await axios.post(url2, data2);
        setCurrUserProfileId((prev) => response2?.data?.profileid);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(retrieveMessages, 1000);
    return () => clearInterval(interval);
  }, []);
  // useEffect(() => {
  //   if (shouldRecreate) {
  //     setShouldRecreate((prev) => false);
  //     clearInterval(currInterval);
  //     const interval = setInterval(retrieveMessages, 1000);
  //     setCurrInterval((prev) => interval);
  //     setMessages((prev) => []);
  //   }
  // }, [shouldRecreate]);

  // useEffect(() => {
  //   (async () => {
  //     const email = localStorage.getItem("email");
  //     try {
  //       const url = "http://localhost:5000/message/getchat";
  //       const data = {
  //         email: email,
  //         chatwithprofileid: currActiveChatProfileId,
  //       };
  //       console.log(currActiveChatProfileId, messages);
  //       const response = await axios.post(url, data);
  //       console.log(response, messages);
  //       setMessages((prev) => response?.data?.messages);
  //       const url2 = "http://localhost:5000/user/viewprofile";
  //       const data2 = { email: email };
  //       const response2 = await axios.post(url2, data2);
  //       setCurrUserProfileId((prev) => response2?.data?.profileid);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  //   setShouldRecreate((prev) => true);
  // }, [currActiveChatProfileId]);

  return (
    <div className="container overflow-scroll" style={{ maxHeight: "90vh" }}>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          currUserProfileId={currUserProfileId}
          textBy={message.senderprofileid}
          message={message.Message}
        />
      ))}
      {/* {numList.map((item, index) =>
        item % 2 ? (
          <ChatMessage currUserProfileId={currUserProfileId} textBy={"self"} message={"Hi there"} />
        ) : (
          <ChatMessage currUserProfileId={currUserProfileId} textBy={"other"} message={"Hi How r u?"} />
        )
      )} */}
    </div>
  );
};

export default ChatMessages;
