const RightBar = ({ userimgurl, username }) => {
  return (
    <div className="col-2 border-start border-2 shadow offset-10 vh-100 position-fixed">
      <div className="d-flex justify-content-left mx-2 my-3">
        <span className="me-3">
          {
            <img
              src={userimgurl}
              style={{ maxHeight: "2em", maxWidth: "2em" }}
              className="rounded-circle"
            />
          }
        </span>{" "}
        <span className="fs-5 align-text-middle">{username}</span>
      </div>
    </div>
  );
};

export default RightBar;
