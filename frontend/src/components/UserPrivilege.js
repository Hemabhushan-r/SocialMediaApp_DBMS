import axios from "axios";
import { useState } from "react";

const UserPrivilege = () => {
  const [query, setQuery] = useState("");
  const [queryRes, setQueryRes] = useState("");
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/user/query";
      const data = { query_str: query };
      const response = await axios.post(url, data);
      setQueryRes((prev) => response?.data);
    } catch (err) {
      console.log();
    }
  };
  return (
    <div className="card p-2 form shadow-lg">
      <form onSubmit={handleQuerySubmit}>
        <div className="input-container">
          <label>SQL Query</label>
          <input
            type="text"
            name="uname"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        {/* {isErrorSignIn ? renderErrorMessage(errorMesSignIn) : ""} */}
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div className="my-2">{JSON.stringify(queryRes)}</div>
    </div>
  );
};

export default UserPrivilege;
