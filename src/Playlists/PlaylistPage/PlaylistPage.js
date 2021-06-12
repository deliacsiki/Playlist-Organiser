import {
  Button,
  Container,
  Grid,
  Dialog,
  List,
  ListItem,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../redux store/actions/LoginActions";
import * as userActions from "../../redux store/actions/UserActions";
import * as playlistActions from "../../redux store/actions/PlaylistActions";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { capitalize } from "../../common/utilities";

import SongBrowser from "../SongBrowser/SongBrowser";
import SongCard from "../SongCard/SongCard";
import cssClasses from "./PlaylistPage.module.css";
import Sidebar from "../../UI/Sidebar/Sidebar";
import VotingList from "../VotingList/VotingList";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const websocket = new W3CWebSocket("ws://127.0.0.1:8000");

const PlaylistPage = (props) => {
  const [firstRender, setFirstRender] = useState(true);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [toggleBackdrop, setToggleBackdrop] = useState(false);
  const [toggleVoting, setToggleVoting] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

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
    (songUri, deviceId) =>
      dispatch(playlistActions.playSong(songUri, deviceId)),
    []
  );
  const getCurrentRoom = useCallback(
    (roomId) => dispatch(userActions.getRoom(roomId)),
    []
  );
  const getAvailableDevices = useCallback(
    () => dispatch(playlistActions.getAvailableDevices()),
    []
  );
  const addSongToVotingList = useCallback(
    (votingListItem) =>
      dispatch(playlistActions.addSongToVotingList(votingListItem)),
    []
  );
  const updateVotingList = useCallback(
    (votingList) => dispatch(playlistActions.updateVotingList(votingList)),
    []
  );
  const updateOneSongFromVotingList = useCallback(
    (song) => dispatch(playlistActions.updateOneSongFromVotingList(song)),
    []
  );
  const updateQueueList = useCallback(
    (queueList) => dispatch(playlistActions.updateQueueList(queueList)),
    []
  );
  const updateCurrentlyPlaying = useCallback(
    (song) => dispatch(playlistActions.updateCurrentlyPlaying(song)),
    []
  );

  // get state variables
  const isAuthenticated = useSelector((state) => {
    return state.login.token != null;
  });
  const currentlyPlaying = useSelector((state) => {
    return state.playlist.currentlyPlaying;
  });
  const currentRoom = useSelector((state) => {
    return state.user.currentRoom;
  });
  const activeDevice = useSelector((state) => {
    return state.playlist.activeDevice;
  });
  const availableDevices = useSelector((state) => {
    return state.playlist.availableDevices;
  });
  const votingList = useSelector((state) => {
    return state.playlist.votingList;
  });
  const queueList = useSelector((state) => {
    return state.playlist.queueList;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    var roomId = params.get("id");
    setCurrentRoomId(roomId);
    getCurrentRoom(roomId);

    websocket.onopen = () => {
      console.log("WebSocket Client Connected");
      websocket.send(
        JSON.stringify({
          type: "client-enter-room",
          clientId: localStorage.getItem("userId"),
          roomId: roomId,
          token: localStorage.getItem("token"),
        })
      );
    };

    websocket.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      switch (message.type) {
        case "update-room":
          updateVotingList(message.data.votingList);
          // update queues
          // update currently playing
          break;
        case "update-voting-list":
          updateVotingList(message.data);
          break;
        case "update-queue-list":
          updateQueueList(message.data);
          break;
        case "update-song-votinglist":
          updateOneSongFromVotingList(message.data);
          break;
        case "add-to-voting-list":
          addSongToVotingList(message.data);
          break;
        case "update-currently-playing":
          updateCurrentlyPlaying(message.data);
          break;
      }
      console.log(message);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUserDetails();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!firstRender)
      setShowDialog(
        availableDevices.length === 0 || availableDevices.length > 1
      );
    else setFirstRender(false);
  }, [availableDevices]);

  const handleBackButton = () => {
    window.location.href = "http://localhost:3000/home";
  };

  const handleSongSelection = (songId) => {
    websocket.send(
      JSON.stringify({
        type: "client-wants-song",
        roomId: currentRoomId,
        clientId: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
        song: songId,
      })
    );
    setTimeout(() => {
      websocket.send(
        JSON.stringify({
          type: "client-voted-song",
          roomId: currentRoomId,
          clientId: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
          vote: `votesYes`,
          songDataId: songId,
        })
      );
    }, 300);
    // getSong(songId);
  };

  const handleActiveDeviceSet = () => {
    if (currentlyPlaying && activeDevice)
      playSong(currentlyPlaying.data.uri, activeDevice.id);
  };

  const handleDeviceClick = (deviceId) => {
    playSong(currentlyPlaying.data.uri, deviceId);
    setShowDialog(false);
  };

  const playCurrentSong = () => {
    if (currentlyPlaying) {
      getAvailableDevices();
    }
  };

  const handleNewVote = (vote, songId) => {
    websocket.send(
      JSON.stringify({
        type: "client-voted-song",
        roomId: currentRoomId,
        clientId: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
        songId: songId,
        vote: `votes${capitalize(vote)}`,
      })
    );
  };

  var currentSong = <p>No song playing</p>;
  if (currentlyPlaying) {
    currentSong = (
      <div className={cssClasses.CurrentSong}>
        <div>
          <img src={currentlyPlaying.data.albumImg} />
        </div>
        <div>
          <p className={cssClasses.CurrentSongTitle}>
            {currentlyPlaying.data.name}
          </p>
          <p className={cssClasses.CurrentSongArtist}>
            {currentlyPlaying.data.artists
              .map((artist) => artist.name)
              .join(", ")}
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

  const activeDeviceModal =
    availableDevices.length > 1 ? (
      <Dialog open={showDialog}>
        <div className={cssClasses.Dialog}>
          <h4>We found the following available devices:</h4>
          <List>
            {availableDevices.map((device) => {
              return (
                <ListItem
                  button
                  key={device.id}
                  onClick={() => handleDeviceClick(device.id)}
                >
                  {device.name + " - " + device.type}
                </ListItem>
              );
            })}
          </List>
          <br />
          <Button onClick={() => setShowDialog(false)}>BACK</Button>
        </div>
      </Dialog>
    ) : activeDevice ? (
      handleActiveDeviceSet()
    ) : (
      <Dialog open={showDialog}>
        <div className={cssClasses.Dialog}>
          <h4>No active device found!</h4>
          <p>Please open your Spotify on a device.</p>
          <Button onClick={() => setShowDialog(false)}>OK</Button>
        </div>
      </Dialog>
    );

  return (
    <React.Fragment>
      <Sidebar>
        <SongBrowser
          onSongSelect={handleSongSelection}
          onChange={() => setToggleVoting(false)}
          onInputClear={() => {
            setToggleVoting(true);
          }}
        />
        {toggleVoting ? (
          <VotingList
            songsList={votingList}
            websocket={websocket}
            onVote={handleNewVote}
          />
        ) : null}
      </Sidebar>
      {showDialog ? activeDeviceModal : null}
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
        <div className={cssClasses.SongQueueSection}>
          <p>Songs in queue</p>
          <Grid container fullwidth className={cssClasses.SongQueue}>
            {queueList && queueList.length != 0
              ? queueList.map((song) => {
                  return (
                    <SongCard
                      key={song.id}
                      song={song.data}
                      style={{ width: "100%" }}
                      withAlbumArt={true}
                      withHover={false}
                      withSkipButton={true}
                      onSkip={() => {
                        console.log("SKipping");
                      }}
                    />
                  );
                })
              : null}
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlaylistPage;
