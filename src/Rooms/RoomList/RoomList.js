import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import RoomCard from "../RoomCard/RoomCard";
import * as actions from "../../redux store/actions/UserActions";
import cssClasses from "./RoomList.module.css";

const RoomList = ({ rooms }) => {
  const dispatch = useDispatch();
  const deleteRoom = useCallback(
    (roomId) => dispatch(actions.deleteUserRoom(roomId)),
    []
  );

  const handleAddRoom = (event) => {
    // handle add room button
    event.preventDefault();
  };

  const handleOpenRoom = (event, roomId) => {
    // handle open room
    event.preventDefault();
    console.log(`Clicked room with id ${roomId}`);
    window.location.href = "http://localhost:3000/room/" + roomId;
  };

  const handleDeleteRoom = (event, roomId) => {
    // handle delete room
    event.preventDefault();
    console.log(`Delete room with id ${roomId}`);
    deleteRoom(roomId);
  };

  return (
    <div className={cssClasses.RoomList}>
      <RoomCard type="ADD_ROOM" onClick={(event) => handleAddRoom(event)} />
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
