import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import cssClasses from "./RoomForm.module.css";

const RoomForm = ({ submitHandler }) => {
  const handleSubmit = (event) => {
    // handle add room button
    event.preventDefault();
  };

  return (
    <div className={cssClasses.RoomForm}>
      <div className={cssClasses.FormHeader}>Add a new room</div>
      <FormControl className={cssClasses.FormControl}>
        <InputLabel htmlFor="room-name">Room name</InputLabel>
        <Input id="room-name" aria-describedby="room-name-helper" required />
        <FormHelperText id="room-name-helper">
          Name your new room.{" "}
        </FormHelperText>

        <Button className={cssClasses.SubmitBtn} color={"primary"} variant={"outlined"}>
          ADD ROOM
        </Button>
      </FormControl>
    </div>
  );
};

export default RoomForm;
