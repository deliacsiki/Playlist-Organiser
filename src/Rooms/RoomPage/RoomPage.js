import React, { useCallback, useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import RoomList from "../RoomList/RoomList";

import * as loginActions from "../../redux store/actions/LoginActions";
import * as userActions from "../../redux store/actions/UserActions";
import * as URLConstants from "../../redux store/URLConstants";

import cssClasses from "./RoomPage.module.css";
import { Button } from "@material-ui/core";
import RoomForm from "../RoomForm/RoomForm";

const RoomPage = (props) => {
  const modalCloseRef = useRef(null);

  const dispatch = useDispatch();
  // get login dispatchers
  const authenticate = useCallback(
    (token) => dispatch(loginActions.authenticate(token)),
    []
  );
  const logOut = useCallback(
    () => dispatch(loginActions.authenticationLogout()),
    []
  );
  // get use dispatchers
  const getUserDetails = useCallback(
    () => dispatch(userActions.getUserData()),
    []
  );
  const createRoom = useCallback(
    (room) => dispatch(userActions.createNewRoom(room)),
    []
  );

  // get state variables
  const isAuthenticated = useSelector((state) => {
    return state.login.token != null;
  });
  // const checkState = useSelector((state) => state.login.stateReceived);
  const displayName = useSelector((state) => state.user.displayName);
  const userRooms = useSelector((state) => state.user.userRooms);
  const sharedRooms = useSelector((state) => state.user.sharedRooms);

  useEffect(() => {
    // get URL params if any
    if (window.location.search.length !== 0) {
      const params = new URLSearchParams(window.location.search);
      let token = params.get("code");
      if (
        token === null &&
        localStorage.getItem("token") === null &&
        localStorage.getItem("userId") === null
      ) {
        // redirect to login
        window.location.href = `${URLConstants.LOCALHOST_URL_CLIENT}`;
      }
      // authenticate user
      authenticate(token);
    } else {
      getUserDetails();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUserDetails();
    }
  }, [isAuthenticated]);

  const addNewRoomHandler = (roomName) => {
    createRoom(roomName);
    modalCloseRef.current?.click();
  };

  const joinRoomHandler = () => {
    console.log("Join new room by code soon");
    modalCloseRef.current?.click();
  };

  const logoutHandler = () => {
    logOut();
    window.location.href = `${URLConstants.LOCALHOST_URL_CLIENT}`;
  };

  return (
    <React.Fragment>
      <div className={cssClasses.App}>
        <div className={cssClasses.Header}>
          {displayName ? <p>{displayName}</p> : null}
          <Button onClick={logoutHandler}>LOG OUT</Button>
        </div>

        <RoomList
          rooms={userRooms}
          modalCloseRef={modalCloseRef}
          formInModal={<RoomForm submitHandler={addNewRoomHandler} />}
        />
        <hr />
        <div className={cssClasses.SharedRoomsHeader}>Rooms you are in</div>
        <RoomList
          rooms={sharedRooms}
          firstTileLabel="Join a room"
          modalCloseRef={modalCloseRef}
          formInModal={<RoomForm submitHandler={joinRoomHandler} />}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
