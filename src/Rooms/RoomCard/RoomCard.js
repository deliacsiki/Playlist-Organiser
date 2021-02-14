import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import cssClasses from "./RoomCard.module.css";
import { Button } from "@material-ui/core";

const RoomCard = ({ name, type = null, clickHandler, deleteHandler }) => {
  const classes = [cssClasses.RoomCard];
  const [isPlusCard, setIsPlusCard] = useState(type === "ADD_ROOM");

  var content = <p>{name}</p>;
  if (isPlusCard) {
    classes.push(cssClasses.PlusCard);
    content = <AddIcon />;
  } else {
    classes.push(cssClasses.AddGradient);
  }

  var deleteBtn = (
    <Button
      className={cssClasses.DeleteBtn}
      size={"small"}
      onClick={deleteHandler}
    >
      -
    </Button>
  );

  return (
    <div className={classes.join(" ")} onClick={clickHandler}>
      {content}
      {!isPlusCard ? deleteBtn : null}
    </div>
  );
};

export default RoomCard;
