import React, { useCallback, useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import RoomList from "../RoomList/RoomList";

import * as loginActions from "../../redux store/actions/LoginActions";
import * as userActions from "../../redux store/actions/UserActions";
import * as URLConstants from "../../redux store/URLConstants";

import cssClasses from "./RoomPage.module.css";
import { Button, Dialog, DialogActions } from "@material-ui/core";
import ProfilePictureIcon from "../../UI/ProfilePictureIcon/ProfilePictureIcon";
import RoomForm from "../RoomForm/RoomForm";
import JoinRoomForm from "../RoomForm/JoinRoomForm/JoinRoomForm";

const RoomPage = (props) => {
  const modalCloseRef = useRef(null);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

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
  const joinRoom = useCallback(
    (room) => dispatch(userActions.joinRoom(room)),
    []
  );
  const deleteRoom = useCallback(
    (roomId) => dispatch(userActions.deleteUserRoom(roomId)),
    []
  );
  const unshareRoom = useCallback(
    (roomId) => dispatch(userActions.unsubscribeUserRoom(roomId)),
    []
  );

  // get state variables
  const isAuthenticated = useSelector((state) => {
    return state.login.token != null;
  });
  // const checkState = useSelector((state) => state.login.stateReceived);
  const user = useSelector((state) => state.user.user);
  const userRooms = useSelector((state) => state.user.userRooms);
  const sharedRooms = useSelector((state) => state.user.sharedRooms);
  const loading = useSelector((state) => state.user.loading);

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

  const joinRoomHandler = (room) => {
    joinRoom(room);
    modalCloseRef.current?.click();
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    if (roomToDelete.owner) {
      deleteRoom(roomToDelete.roomId);
    } else unshareRoom(roomToDelete.roomId);
    setRoomToDelete(null);
  };

  const deleteRoomForUser = (id, owner) => {
    if (owner) {
      var roomClicked = userRooms.find((room) => room._id === id);
      if (roomClicked.people.length != 0) {
        setRoomToDelete({ roomId: id, owner: owner, withPeople: true });
        setShowDialog(true);
        return;
      }
    }
    setRoomToDelete({ roomId: id, owner: owner });
    setShowDialog(true);
  };

  const logoutHandler = () => {
    logOut();
    window.location.href = `${URLConstants.LOCALHOST_URL_CLIENT}`;
  };

  return (
    <React.Fragment>
      {showDialog ? (
        <Dialog open={showDialog}>
          <div className={cssClasses.Dialog}>
            {roomToDelete.withPeople ? (
              <h4>This room is shared with other people</h4>
            ) : (
              <h4>
                Are you sure you want to{" "}
                {roomToDelete.owner ? " delete " : " unsubscribe to "} this
                room?
              </h4>
            )}
            {roomToDelete.withPeople ? (
              <p>Are you sure you want to delete it?</p>
            ) : null}
            <DialogActions>
              <Button onClick={handleDialogConfirm}>YES</Button>
              <Button onClick={() => setShowDialog(false)}>No</Button>
            </DialogActions>
          </div>
        </Dialog>
      ) : null}
      {loading ? (
        <div className={cssClasses.LoadingScreen}>
          <div className={cssClasses.loader}>
            <span className={cssClasses.stroke}></span>
            <span className={cssClasses.stroke}></span>
            <span className={cssClasses.stroke}></span>
            <span className={cssClasses.stroke}></span>
            <span className={cssClasses.stroke}></span>
            <span className={cssClasses.stroke}></span>
            <span className={cssClasses.stroke}></span>
          </div>
        </div>
      ) : (
        <div className={cssClasses.App}>
          <div className={cssClasses.Header}>
            <div className={cssClasses.UserInfo}>
              {user ? (
                <React.Fragment>
                  {user.profile ? (
                    <img
                      src={user.profile}
                      className={cssClasses.UserProfile}
                    />
                  ) : (
                    <ProfilePictureIcon
                      name={user.displayName}
                      className={cssClasses.UserProfile}
                    />
                  )}
                  {user.displayName ? <p>{user.displayName}</p> : null}
                </React.Fragment>
              ) : null}
            </div>
            <Button onClick={logoutHandler}>LOG OUT</Button>
          </div>

          <div className={cssClasses.YourRoomsHeader}>Your rooms</div>
          <RoomList
            rooms={userRooms}
            modalCloseRef={modalCloseRef}
            formInModal={<RoomForm submitHandler={addNewRoomHandler} />}
            onDelete={(id) => deleteRoomForUser(id, true)}
            gradientColor="#07BEB8"
          />
          <div className={cssClasses.HR}></div>
          <div className={cssClasses.SharedRoomsHeader}>Rooms you are in</div>
          <RoomList
            rooms={sharedRooms}
            firstTileLabel="Join a room"
            modalCloseRef={modalCloseRef}
            formInModal={<JoinRoomForm submitHandler={joinRoomHandler} />}
            onDelete={(id) => deleteRoomForUser(id, false)}
            gradientColor="#BA274A"
          />
        </div>
      )}
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
