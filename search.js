import React from "react";
import { useState } from "react";
import "./search.css";
const Search = () => {
  const [searchitem, setsearchitem] = useState("");
  const [profiles, setuserprofiles] = useState([]);

  const searchFieldHandler = (event) => {
    setsearchitem(event.target.value);
  };

  const ButtonHandler = async (event) => {
    setuserprofiles([]);
    setsearchitem("");
    if (searchitem.length === 0 || searchitem === ' ') {
      alert("ENTER NAME");
    } else {
      event.preventDefault();
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${searchitem}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        const data = await response.json();

        setuserprofiles((prev) => [...prev, ...data.items]);
      } catch (error) {
        console.error("Error occurred while fetching data from API:", error);
      }
    }
  };

  return (
    <div>
      <div className="heading">
        <p>Enter the USERNAME to search</p>
      </div>

      <div className="SearchBar">
        <input
          id="searchfield"
          type="text"
          value={searchitem}
          onChange={searchFieldHandler}
        />
        <button id="searchbutton" onClick={ButtonHandler}>
          {" "}
          SEARCH PROFILE
        </button>
      </div>

      {profiles.length > 0 && (
        <div className="profile-container">
          {profiles.map((user) => (
            <div className="card" key={user.id}>
              <div className="profile">
                <img src={user.avatar_url} id="profile-img" alt={user.login} />
              </div>
              <div>
                <p>
                  <label className="name">Name : </label> {user.login}
                </p>
                <p>
                  <label className="name">Link : </label>
                  <a href={user.html_url}>{user.html_url}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
