const SearchProfile = ({ profileid, userimgurl, firstname, lastname }) => {
  return (
    <div className="card shadow my-2 py-2">
      <div className="card-content row justify-content-start">
        <div className="col-3">
          <img
            src={
              userimgurl
                ? userimgurl
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            style={{ maxHeight: "2em", maxWidth: "2em" }}
            className="rounded-circle"
          />
        </div>
        <div className="col-8">
          <div className="text-start">
            {firstname}
            {"\t\t"}
            {lastname}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProfile;
