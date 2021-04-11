import SearchBar from "material-ui-search-bar";
import { Container } from "@material-ui/core";
import * as cssClasses from "./BrowseSongsList.module.css";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "../SongCard/SongCard";
import * as playlistActions from "../../redux store/actions/PlaylistActions";

const BrowseSongsList = ({ onSongSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  let searchTimeout = 0;

  const dispatch = useDispatch();
  // search for song
  const searchForSong = useCallback(
    (songName) => dispatch(playlistActions.searchSong(songName)),
    []
  );

  const loadingSongs = useSelector((state) => {
    return state.playlist.loading;
  });
  const fetchedSongs = useSelector((state) => {
    return state.playlist.searchedSongs;
  });

  const handleInputChange = (value) => {
    setSearchValue(value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
      // validate value before searching
      if (value) searchForSong(value);
    }, 300);
  };

  return (
    <div className={cssClasses.BrowseSongsList}>
      <Container className={cssClasses.SearchContainer}>
        <p>Browse your favourite songs</p>

        <SearchBar
          value={searchValue}
          onChange={(newValue) => handleInputChange(newValue)}
        />
        <div className={cssClasses.SongsList}>
          {fetchedSongs
            ? fetchedSongs.map((song) => {
                return (
                  <SongCard
                    key={song.id}
                    song={song}
                    onClick={() => onSongSelect(song.id)}
                  />
                );
              })
            : null}
        </div>
      </Container>
    </div>
  );
};

export default BrowseSongsList;
