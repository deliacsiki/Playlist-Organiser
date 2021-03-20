import { Button } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../redux store/actions/LoginActions";
import * as userActions from "../../redux store/actions/UserActions";

import cssClasses from "./PlaylistPage.module.css";

const PlaylistPage = (props) => {
  const dispatch = useDispatch();
  // get login dispatchers
  const authenticate = useCallback(
    (token) => dispatch(loginActions.authenticate(token)),
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
  const loading = useSelector((state) => state.login.loading);
  // const checkState = useSelector((state) => state.login.stateReceived);
  const displayName = useSelector((state) => state.user.displayName);
  const userRooms = useSelector((state) => state.user.userRooms);

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

  return (
    <React.Fragment>
      <div>Playlist page</div>
      <Button onClick={handleBackButton}>Back</Button>
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
