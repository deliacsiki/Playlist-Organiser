import SearchBar from "material-ui-search-bar";
import { Container } from "@material-ui/core";
import * as cssClasses from "./BrowseSongsList.module.css";
import { useState } from "react";

const BrowseSongsList = () => {
  const [searchValue, setSearchValue] = useState("");

  const doSomethingWith = (value) => {
    console.log("Search for ", value);
  };

  const handleInputChange = (value) => {
    setSearchValue(value);
    console.log(value + "changed");
  };

  return (
    <div className={cssClasses.BrowseSongsList}>
      <Container className={cssClasses.SearchContainer}>
        <SearchBar
          value={searchValue}
          onChange={(newValue) => handleInputChange(newValue)}
          onRequestSearch={() => doSomethingWith(searchValue)}
        />
      </Container>
    </div>
  );
};

export default BrowseSongsList;
