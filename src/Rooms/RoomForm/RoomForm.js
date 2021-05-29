import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputBase,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import cssClasses from "./RoomForm.module.css";

const useStyles = makeStyles({
  formControl: {
    width: "60%",
    height: "100%",
    position: "relative",
  },
  addRoomBtn: {
    margin: "1rem",
    width: "50%",
    position: "absolute",
    bottom: 0,
    left: "50%",
  },
});

const RoomForm = ({ submitHandler }) => {
  const cssClassesMaterial = useStyles();
  const [fields, setFields] = useState({
    roomName: {
      value: "",
      error: "",
      touched: false,
      required: true,
      validation: {
        minLenght: 2,
        notNull: true,
      },
    },
  });

  const validateData = () => {};

  const handleSubmit = () => {
    validateData();
    submitHandler(fields.roomName.value);
  };

  const form = (
    <React.Fragment>
      <InputLabel htmlFor="room-name">Room name</InputLabel>
      <Input
        id="room-name"
        aria-describedby="room-name-helper"
        error={fields.roomName.error != ""}
        onChange={(event) =>
          setFields({ roomName: { value: event.target.value } })
        }
      />
      <FormHelperText id="room-name-helper">Name your new room</FormHelperText>
    </React.Fragment>
  );

  return (
    <div className={cssClasses.RoomForm}>
      <div className={cssClasses.FormHeader}>Add a new room</div>
      <FormControl className={cssClassesMaterial.formControl}>
        {form}
        <Button
          className={cssClassesMaterial.addRoomBtn}
          color={"primary"}
          variant={"contained"}
          type="submit"
          onClick={handleSubmit}
        >
          ADD ROOM
        </Button>
      </FormControl>
    </div>
  );
};

export default RoomForm;
