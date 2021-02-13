import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../redux store/actions/LoginActions";
import * as userActions from "../../redux store/actions/UserActions";

import "./RoomPage.css";

const RoomPage = (props) => {
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

  useEffect(() => {
    // get URL params
    const params = new URLSearchParams(window.location.search);
    let token = params.get("code");
    console.log(token);
    if (token === null && localStorage.getItem("token") === null) {
      // redirect to login
      window.location.href = "http://localhost:3000";
    }
    // let newState = params.get("state");
    // console.log(checkState);
    // if (checkState === newState) {
    // authenticate user
    authenticate(token);
    // }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUserDetails();
    }
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      <div className="App">
        <h1>
          {isAuthenticated
            ? "AUTHENTICATION SUCCESSFUL"
            : "AUTHENTICATION FAIL"}
        </h1>
        {displayName ? `Welcome, ${displayName}` : null}
        {loading ? <div className="loader">Loading...</div> : null}
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
