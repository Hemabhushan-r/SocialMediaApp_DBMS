import { AiOutlineSearch } from "react-icons/ai";
import SearchProfile from "./SearchProfile";

const Search = ({ searchText, setSearchText, searchRes }) => {
  return (
    <div className="col-8 vh-100 offset-2 container-fluid">
      <div className="input-group my-3 shadow rounded">
        <input
          type="text"
          className="form-control"
          placeholder="Search Username"
          aria-label="Search Username"
          aria-describedby="button-addon2"
          style={{ minHeight: "4rem" }}
          value={searchText}
          onChange={(e) => setSearchText((prev) => e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          <AiOutlineSearch />
        </button>
      </div>
      <div>
        {searchRes.map((profile, index) => (
          <SearchProfile
            key={index}
            firstname={profile.FirstName}
            lastname={profile.LastName}
            profileid={profile.profileid}
            userimgurl={profile.PictureURL}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
