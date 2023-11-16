const ChatMessage = ({ textBy, message, currUserProfileId }) => {
  return (
    <div
      className={
        textBy == currUserProfileId
          ? "row justify-content-end"
          : "row justify-content-start"
      }
    >
      <div
        className={
          textBy == currUserProfileId
            ? "col-8 text-end  my-3"
            : "col-8 text-start my-3"
        }
      >
        <span
          className={
            textBy == currUserProfileId
              ? "border bg-secondary rounded p-2"
              : "border rounded p-2"
          }
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
