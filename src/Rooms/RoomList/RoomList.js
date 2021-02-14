import React from "react";
import RoomCard from "../RoomCard/RoomCard";

import cssClasses from "./RoomList.module.css";

const RoomList = ({ rooms }) => {
  const handleAddRoom = (event) => {
    // handle add room button
    event.preventDefault();
  };

  const handleOpenRoom = (event, roomId) => {
    // handle open room
    event.preventDefault();
    console.log(`Clicked room with id ${roomId}`);
  };

  const handleDeleteRoom = (event, roomId) => {
    // handle delete room
    event.preventDefault();
    console.log(`Delete room with id ${roomId}`);
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
