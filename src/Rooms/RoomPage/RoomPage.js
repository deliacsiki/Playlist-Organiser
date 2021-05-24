import React, { useCallback, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import RoomList from "../RoomList/RoomList";

import * as loginActions from "../../redux store/actions/LoginActions";
import * as userActions from "../../redux store/actions/UserActions";
import * as URLConstants from "../../redux store/URLConstants";

import cssClasses from "./RoomPage.module.css";
import { Button } from "@material-ui/core";

const RoomPage = (props) => {
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
  // get state variables
  const isAuthenticated = useSelector((state) => {
    return state.login.token != null;
  });
  // const checkState = useSelector((state) => state.login.stateReceived);
  const displayName = useSelector((state) => state.user.displayName);
  const userRooms = useSelector((state) => state.user.userRooms);

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

  const addNewRoomHandler = () => {
    console.log("New room soon to be added");
  };

  const logoutHandler = () => {
    logOut();
    window.location.href = `${URLConstants.LOCALHOST_URL_CLIENT}`;
  };

  return (
    <React.Fragment>
      <div className={cssClasses.App}>
        <div className={cssClasses.Header}>
          {displayName ? `Welcome, ${displayName}` : null}
          <Button onClick={logoutHandler}>LOG OUT</Button>
        </div>

        <RoomList rooms={userRooms} submitHandler={addNewRoomHandler} />
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
