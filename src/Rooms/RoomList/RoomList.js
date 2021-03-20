import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import RoomCard from "../RoomCard/RoomCard";
import RoomForm from "../RoomForm/RoomForm";
import Backdrop from "../../UI/Backdrop/Backdrop";

import * as actions from "../../redux store/actions/UserActions";
import * as URLConstants from "../../redux store/URLConstants";

import cssClasses from "./RoomList.module.css";

const RoomList = ({ rooms }) => {
  const [toggleBackdrop, setToggleBackdrop] = useState(false);

  const dispatch = useDispatch();
  const deleteRoom = useCallback(
    (roomId) => dispatch(actions.deleteUserRoom(roomId)),
    []
  );

  const handleToggleBackdrop = (event) => {
    // toggle backdrop only if you clicked on it
    if (event.target.className.includes("Backdrop_BackdropBackground")) {
      setToggleBackdrop(false);
    }
  };

  const handleAddRoom = (event) => {
    // handle add room button
    event.preventDefault();
    setToggleBackdrop(true);
  };

  const handleOpenRoom = (event, roomId) => {
    // handle open room
    event.preventDefault();
    console.log(`Clicked room with id ${roomId}`);
    window.location.href = `${URLConstants.LOCALHOST_URL_CLIENT}/room/${roomId}`;
  };

  const handleDeleteRoom = (event, roomId) => {
    // handle delete room
    event.preventDefault();
    console.log(`Delete room with id ${roomId}`);
    deleteRoom(roomId);
  };

  return (
    <div className={cssClasses.RoomList}>
      {toggleBackdrop ? (
        <Backdrop toggleBackdrop={(event) => handleToggleBackdrop(event)}>
          <RoomForm />
        </Backdrop>
      ) : null}
      <RoomCard
        type="ADD_ROOM"
        clickHandler={(event) => handleAddRoom(event)}
      />
      {rooms
        ? rooms.map((room) => (
            <RoomCard
              key={room._id}
              name={room.name}
              clickHandler={(event) => handleOpenRoom(event, room._id)}
              deleteHandler={(event) => handleDeleteRoom(event, room._id)}
            />
          ))
        : null}
    </div>
  );
};

export default RoomList;
