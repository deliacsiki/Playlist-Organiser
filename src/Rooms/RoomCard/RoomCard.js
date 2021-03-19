import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import cssClasses from "./RoomCard.module.css";
import { Button } from "@material-ui/core";
import WhiteCloseBtn from '../../resources/icons/whiteX.svg';

const RoomCard = ({ name, type = null, clickHandler, deleteHandler }) => {
  const classes = [cssClasses.RoomCard];
  const [isPlusCard, setIsPlusCard] = useState(type === "ADD_ROOM");
  const [toggleCloseBtn, setToggleCloseBtn] = useState(false);

  const handleMouseEnter = () => {
    setToggleCloseBtn(true);
  }

  const handleMouseLeave = () => {
    setToggleCloseBtn(false);
  }

  var content = <p>{name}</p>;
  if (isPlusCard) {
    classes.push(cssClasses.PlusCard);
    content = <AddIcon />;
  } else {
    classes.push(cssClasses.AddGradient);
  }

  var deleteBtn = (
    <div className={cssClasses.DeleteBtn} onClick={deleteHandler} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img className={cssClasses.DeleteIcon} src={WhiteCloseBtn} alt="Close" />
    </div>
  );

  return (
    <div className={cssClasses.CardContainer}>
      <div className={classes.join(" ")} onClick={clickHandler} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {content}
      </div>
      {!isPlusCard && toggleCloseBtn ? deleteBtn : null}
    </div>
  );
};

export default RoomCard;
