import { Button, Container } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../redux store/actions/LoginActions";
import * as userActions from "../../redux store/actions/UserActions";
import * as playlistActions from "../../redux store/actions/PlaylistActions";
import Backdrop from "../../UI/Backdrop/Backdrop";

import BrowseSongsList from "../BrowseSongsList/BrowseSongsList";
import cssClasses from "./PlaylistPage.module.css";

const PlaylistPage = (props) => {
  const [toggleBackdrop, setToggleBackdrop] = useState(false);

  const dispatch = useDispatch();
  // get user dispatchers
  const getUserDetails = useCallback(
    () => dispatch(userActions.getUserData()),
    []
  );
  const getSong = useCallback(
    (songId) => dispatch(playlistActions.getTrack(songId)),
    []
  );
  const playSong = useCallback(
    (songUri) => dispatch(playlistActions.playSong(songUri)),
    []
  );
  const getCurrentRoom = useCallback(
    (roomId) => dispatch(userActions.getRoom(roomId)),
    []
  );
  // get state variables
  const isAuthenticated = useSelector((state) => {
    return state.login.token != null;
  });
  const lastFetchedSong = useSelector((state) => {
    return state.playlist.lastFetchedSong;
  });
  const currentRoom = useSelector((state) => {
    return state.user.currentRoom;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    getCurrentRoom(params.get("id"));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUserDetails();
    }
  }, [isAuthenticated]);

  const handleBackButton = () => {
    window.location.href = "http://localhost:3000/home";
  };

  const handleAddSong = () => {
    setToggleBackdrop(true);
  };

  const handleCloseBackdrop = () => {
    setToggleBackdrop(false);
  };

  const handleSongSelection = (songId) => {
    setToggleBackdrop(false);
    // add song to queue if only one user in room
    // go to voting if more users

    getSong(songId);
  };

  const playCurrentSong = () => {
    if (lastFetchedSong) {
      playSong(lastFetchedSong.uri);
    }
  };

  var currentSong = <p>No song playing</p>;
  if (lastFetchedSong) {
    currentSong = (
      <div className={cssClasses.CurrentSong}>
        <div>
          <img src={lastFetchedSong.album.images[1].url} />
        </div>
        <div>
          <p className={cssClasses.CurrentSongTitle}>{lastFetchedSong.name}</p>
          <p className={cssClasses.CurrentSongArtist}>
            {lastFetchedSong.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
        <div
          style={{
            color: "white",
            position: "absolute",
            bottom: 0,
            right: 0,
            cursor: "pointer",
          }}
          onClick={playCurrentSong}
        >
          PLAY
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      {toggleBackdrop ? (
        <Backdrop toggleBackdrop={handleCloseBackdrop}>
          <BrowseSongsList onSongSelect={handleSongSelection} />
        </Backdrop>
      ) : null}
      <div className={cssClasses.NavBar}>
        {currentRoom ? (
          <div>
            ROOM CODE: <b>{currentRoom.code}</b>
          </div>
        ) : null}
        <Button onClick={handleBackButton}>Back</Button>
      </div>
      <div className={cssClasses.PlaylistPage}>
        <div className={cssClasses.CurrentSongSection}>
          <p>Currently playing</p>
          <Container className={cssClasses.CurrentSongContainer}>
            {currentSong}
          </Container>
        </div>
        <Button onClick={handleAddSong} color="primary">
          Add a song
        </Button>
        <div className={cssClasses.SongQueueSection}>
          <p>Songs in queue</p>
          <Container className={cssClasses.SongQueue}>
            {/* songs in queue */}
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    stateReceived: state.login.stateReceived,
    isAuthenticated: state.login.token != null,
  };
};

const mapDispatchToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
