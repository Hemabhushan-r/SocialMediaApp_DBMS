import SideBarMenu from "./SideBarMenu";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { TbMessage } from "react-icons/tb";
import { FiMoreHorizontal, FiPlusSquare } from "react-icons/fi";
import SearchSideBarMenu from "./SearchSideBarMenu";

const SideBar = ({ profileimgurl, setCurrentScreen }) => {
  return (
    <div className="col-2 border-end shadow border-2 vh-100 position-fixed">
      <h4 className="mt-3 mb-5">Tweetagram</h4>
      <div className="">
        <SideBarMenu
          setCurrentScreen={setCurrentScreen}
          icon={<AiFillHome className="fs-2" />}
          menuText={"Home"}
          menuIndex={0}
        />
        <SideBarMenu
          setCurrentScreen={setCurrentScreen}
          icon={<AiOutlineSearch className="fs-2" />}
          menuText={"Search"}
          menuIndex={1}
        />
        {/* <SearchSideBarMenu
          icon={<AiOutlineSearch className="fs-2" />}
          menuText={"Search"}
        /> */}

        <SideBarMenu
          setCurrentScreen={setCurrentScreen}
          icon={<TbMessage className="fs-2" />}
          menuText={"Messages"}
          menuIndex={2}
        />
        <SideBarMenu
          setCurrentScreen={setCurrentScreen}
          icon={<FiPlusSquare className="fs-2" />}
          menuText={"Create"}
          menuIndex={3}
        />
        <SideBarMenu
          setCurrentScreen={setCurrentScreen}
          icon={
            <img
              src={profileimgurl}
              style={{ maxHeight: "2em", maxWidth: "2em" }}
              className="rounded-circle"
            />
          }
          menuText={"Profile"}
          menuIndex={4}
        />
        <SideBarMenu
          setCurrentScreen={setCurrentScreen}
          icon={<FiMoreHorizontal className="fs-2" />}
          menuText={"More"}
          menuIndex={5}
        />
      </div>
    </div>
  );
};

export default SideBar;
