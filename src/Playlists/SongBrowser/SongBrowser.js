import SearchBar from "material-ui-search-bar";
import { Container } from "@material-ui/core";
import * as cssClasses from "./SongBrowser.module.css";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "../SongCard/SongCard";
import * as playlistActions from "../../redux store/actions/PlaylistActions";

const SongBrowser = ({ onSongSelect, onChange, onInputClear }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

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
    onChange(value);
    if (value && value != "")
      if (searchTimeout) {
        clearTimeout(searchTimeout);
        setSearchTimeout(
          setTimeout(() => {
            if (value) searchForSong(value);
          }, 200)
        );
      } else {
        setSearchTimeout(
          setTimeout(() => {
            if (value) searchForSong(value);
          }, 200)
        );
      }
    else {
      onInputClear(value);
    }
  };

  const handleSongSelect = (songId) => {
    handleInputChange("");
    onSongSelect(songId);
  };

  return (
    <div className={cssClasses.BrowseSongsList}>
      <Container className={cssClasses.SearchContainer}>
        <SearchBar
          value={searchValue}
          onChange={(newValue) => handleInputChange(newValue)}
          onCancelSearch={() => handleInputChange("")}
        />
        {fetchedSongs && searchValue && searchValue != "" ? (
          <div className={cssClasses.SongsList}>
            {fetchedSongs.map((song) => {
              return (
                <SongCard
                  key={song.id}
                  song={song}
                  onClick={() => handleSongSelect(song.id)}
                />
              );
            })}
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default SongBrowser;
