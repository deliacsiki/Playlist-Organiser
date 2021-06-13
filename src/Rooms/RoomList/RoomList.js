import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import RoomCard from "../RoomCard/RoomCard";
import RoomForm from "../RoomForm/RoomForm";
import Backdrop from "../../UI/Backdrop/Backdrop";

import * as actions from "../../redux store/actions/UserActions";
import * as URLConstants from "../../redux store/URLConstants";

import cssClasses from "./RoomList.module.css";
import FormModal from "../../UI/Modals/FormModal";

const RoomList = ({
  rooms,
  firstTileLabel = null,
  formInModal = null,
  modalCloseRef,
  onDelete,
  gradientColor,
}) => {
  // const [toggleBackdrop, setToggleBackdrop] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const handleAddRoom = (event) => {
    // handle add room button
    event.preventDefault();
    // setToggleBackdrop(true);
    setToggleModal(true);
  };

  const handleOpenRoom = (event, roomId) => {
    // handle open room
    event.preventDefault();
    console.log(`Clicked room with id ${roomId}`);
    window.location.href = `${URLConstants.LOCALHOST_URL_CLIENT}/room?id=${roomId}`;
  };

  const handleDeleteRoom = (event, roomId) => {
    // handle delete room
    event.preventDefault();
    onDelete(roomId);
  };

  return (
    <div className={cssClasses.RoomList}>
      {toggleModal ? (
        <FormModal
          modalCloseRef={modalCloseRef}
          showModal={toggleModal}
          form={formInModal}
          closeModal={() => setToggleModal(false)}
        />
      ) : null}
      <RoomCard
        type={"ADD_ROOM"}
        name={firstTileLabel}
        clickHandler={(event) => handleAddRoom(event)}
      />
      {rooms
        ? rooms.map((room) => (
            <RoomCard
              isActive={room.isActive}
              gradientColor={gradientColor}
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
