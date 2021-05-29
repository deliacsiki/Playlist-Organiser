import SearchBar from "material-ui-search-bar";
import { FormControl, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import ReactCodeInput from "react-code-input";
import { GET_ROOM_BY_CODE } from "../../../redux store/URLConstants";

const useStyles = makeStyles({
  formControl: {
    width: "60%",
    height: "100%",
    position: "relative",

    "& .react-code-input input": {
      textTransform: "uppercase",
    },
  },
  addRoomBtn: {
    margin: "1rem",
    width: "50%",
    position: "absolute",
    bottom: 0,
    left: "50%",
  },
});

const JoinRoomForm = ({ submitHandler }) => {
  const classes = useStyles();
  const [code, setCode] = useState("");
  const [codeValid, setCodeValid] = useState(true);
  const [fetchedRooms, setFetchedRooms] = useState(null);

  const handleInputChange = (val) => {
    setCode(val);
    setCodeValid(true);
    if (val.length === 5) {
      handleSubmit(val);
    }
  };

  const handleSubmit = (val) => {
    fetch(GET_ROOM_BY_CODE.replace("{id}", val), { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          setFetchedRooms(null);
          setCodeValid(false);
        } else {
          submitHandler(res[0]);
        }
      });
  };

  const form = (
    <React.Fragment>
      <ReactCodeInput
        type="text"
        fields={5}
        value={code}
        onChange={(newValue) => handleInputChange(newValue.toUpperCase())}
        isValid={codeValid}
      />
    </React.Fragment>
  );

  return (
    <div>
      <div>Join a room</div>
      <FormControl className={classes.formControl}>{form}</FormControl>
    </div>
  );
};

export default JoinRoomForm;
