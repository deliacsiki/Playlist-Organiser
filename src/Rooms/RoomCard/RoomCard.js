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
    <div className={cssClasses.DeleteBtn} onClick={deleteHandler}>
      -
    </div>
  );

  return (
    <div className={cssClasses.CardContainer}>
      <div className={classes.join(" ")} onClick={clickHandler}>
        {content}
      </div>
      {!isPlusCard ? deleteBtn : null}
    </div>
  );
};

export default RoomCard;
