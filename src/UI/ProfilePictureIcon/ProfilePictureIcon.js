import React, { useState } from "react";
import clsx from "clsx";
import { getRandomColor, getInitialsFromName } from "../../common/utilities";

import cssClasses from "./ProfilePictureIcon.module.css";

const ProfilePictureIcon = ({ className = "", name, color = null, key }) => {
  const [randomColor, setRandomColor] = useState(getRandomColor());

  return (
    <div
      key={key}
      className={clsx(className, cssClasses.ProfileIcon)}
      style={color ? { background: color } : { background: randomColor }}
    >
      {getInitialsFromName(name)}
    </div>
  );
};

export default ProfilePictureIcon;
