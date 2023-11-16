import { useState, useEffect } from "react";
import HomeContent from "./HomeContent";
import RightBar from "./RightBar";
import SideBar from "./SideBar";
import Search from "./Search";
import Messages from "./Messages";
import Create from "./Create";
import Profile from "./Profile";
import axios from "axios";

const Home = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const screenMap = {
    0: <HomeContent />,
    1: (
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        searchRes={searchRes}
      />
    ),
    2: <Messages />,
    3: <Create />,
    4: (
      <Profile
        userimgurl={
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        }
        username={"Hemabhushan"}
      />
    ),
  };
  useEffect(() => {
    (async () => {
      try {
        const url = "http://localhost:5000/user/searchprofile";
        const data = { search: searchText };
        const response = await axios.post(url, data);
        console.log(response);
        setSearchRes((prev) => response?.data?.searchRes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [searchText]);
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar
          profileimgurl={
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          setCurrentScreen={setCurrentScreen}
        />
        {screenMap[currentScreen]}
        <RightBar
          userimgurl={
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          username={"Hemabhushan"}
        />
      </div>
    </div>
  );
};

export default Home;
