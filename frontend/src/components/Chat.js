const Chat = ({
  firstname,
  lastname,
  message,
  receiverprofileid,
  isActiveChat,
  setCurrActiveChatProfileId,
  setActiveChatIndex,
  index,
}) => {
  return (
    <li
      onClick={(e) => {
        e.preventDefault();
        setActiveChatIndex((prev) => index);
        setCurrActiveChatProfileId((prev) => receiverprofileid);
      }}
      className={
        isActiveChat
          ? "list-group-item active bg-secondary d-flex justify-content-between align-items-start"
          : "list-group-item d-flex justify-content-between align-items-start"
      }
    >
      <div className="ms-1 me-auto">
        <div className="fw-bold">{firstname + "\t\t" + lastname}</div>
        {message}
      </div>
      {/* <span className="badge bg-primary rounded-pill">14</span> */}
    </li>
  );
};

export default Chat;
