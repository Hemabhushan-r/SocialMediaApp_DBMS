const SearchSideBarMenu = ({ icon, menuText }) => {
  return (
    <div className="d-flex justify-content-left mx-4 my-3">
      <span className="me-3">{icon}</span>{" "}
      <span className="fs-5 align-text-middle">{menuText}</span>
      <div className="btn-group dropend">
        <div
          type="button"
          className="dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropright</span>
        </div>
        <ul
          className="dropdown-menu"
          style={{ minWidth: "20rem", zIndex: "4", position: "relative" }}
        >
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SearchSideBarMenu;
