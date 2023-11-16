const SideBarMenu = ({ icon, menuText, setCurrentScreen, menuIndex }) => {
  return (
    <div
      onClick={(e) => {
        setCurrentScreen(menuIndex);
      }}
      className="d-flex justify-content-left mx-3 my-3 mb-5"
      type="button"
    >
      <span className="me-3">{icon}</span>{" "}
      <span className="fs-5 align-text-middle">{menuText}</span>
    </div>
  );
};

export default SideBarMenu;
