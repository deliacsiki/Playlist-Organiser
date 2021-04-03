import { Button, Container } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../redux store/actions/LoginActions";
import * as userActions from "../../redux store/actions/UserActions";
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
  // get state variables
  const isAuthenticated = useSelector((state) => {
    return state.login.token != null;
  });

  useEffect(() => {
    // get URL params
    const params = new URLSearchParams(window.location.search);
    console.log(params);
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

  return (
    <React.Fragment>
      {toggleBackdrop ? (
        <Backdrop toggleBackdrop={handleCloseBackdrop}>
          <div>Browse your favourite songs</div>
          <BrowseSongsList />
        </Backdrop>
      ) : null}
      <div className={cssClasses.NavBar}>
        <p>Playlist page</p>
        <Button onClick={handleAddSong}>Add a song</Button>
        <Button onClick={handleBackButton}>Back</Button>
      </div>
      <div className={cssClasses.PlaylistPage}>
        <div className={cssClasses.CurrentSongSection}>
          <p>Currently playing</p>
          <Container className={cssClasses.CurrentSongContainer}>
            {/* current song */}
            <p>Song Name</p>
            <p>Artist Name</p>
          </Container>
        </div>
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
