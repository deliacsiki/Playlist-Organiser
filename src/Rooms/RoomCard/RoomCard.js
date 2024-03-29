import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import cssClasses from "./RoomCard.module.css";
import { Button } from "@material-ui/core";
import WhiteCloseBtn from "../../resources/icons/whiteX.svg";
import ProfilePictureIcon from "../../UI/ProfilePictureIcon/ProfilePictureIcon";

const RoomCard = ({
  name,
  type = null,
  clickHandler,
  deleteHandler,
  gradientColor,
  isActive,
  usersInRoom,
}) => {
  const classes = [cssClasses.RoomCard];
  const [isPlusCard, setIsPlusCard] = useState(type === "ADD_ROOM");
  const [toggleCloseBtn, setToggleCloseBtn] = useState(false);

  const handleMouseEnter = () => {
    setToggleCloseBtn(true);
  };

  const handleMouseLeave = () => {
    setToggleCloseBtn(false);
  };

  var content = <p>{name}</p>;
  if (isPlusCard) {
    classes.push(cssClasses.PlusCard);
    content = name || <AddIcon />;
  } else {
    // TODO add gradient with gradientColor
    classes.push(cssClasses.AddGradient);
  }

  var deleteBtn = (
    <div
      className={cssClasses.DeleteBtn}
      onClick={deleteHandler}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className={cssClasses.DeleteIcon} src={WhiteCloseBtn} alt="Close" />
    </div>
  );

  return (
    <div className={cssClasses.CardContainer}>
      <div
        className={classes.join(" ")}
        style={
          isActive
            ? {
                background: `linear-gradient(
            135deg,
            rgba(37, 40, 61, 1) 19%,
            #1db954 100%
          )`,
              }
            : gradientColor
            ? {
                background: `linear-gradient(
          135deg,
          rgba(37, 40, 61, 1) 19%,
          ${gradientColor} 100%
        )`,
              }
            : { background: "#25283D" }
        }
        onClick={clickHandler}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
        {usersInRoom && usersInRoom.length != 0 ? (
          <div className={cssClasses.CardFooter}>
            {usersInRoom.map((user, index) => {
              if (index < 4) {
                if (user.profilePic)
                  return (
                    <img
                      className={cssClasses.UserProfile}
                      src={user.profilePic}
                      key={user.id}
                    />
                  );

                return (
                  <ProfilePictureIcon
                    name={user.name}
                    key={user.id}
                    className={cssClasses.UserProfile}
                  />
                );
              }
              return null;
            })}
          </div>
        ) : null}
      </div>
      {!isPlusCard && toggleCloseBtn ? deleteBtn : null}
    </div>
  );
};

export default RoomCard;
