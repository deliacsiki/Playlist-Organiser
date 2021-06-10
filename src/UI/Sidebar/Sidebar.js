import { Button, makeStyles, Drawer } from "@material-ui/core";
import React, { useState } from "react";
import DrawerArrow from "../../resources/icons/DrawerArrow";

const useStyles = makeStyles({
  root: {
    zIndex: 100,
    position: "relative",
  },
  openButton: {
    position: "absolute",
    right: 0,
    top: "10vh",
    background: "#25283D",
    height: "100px",
    borderRadius: "200px 0 0 200px;",
    width: "55px",
    display: "flex",
    alignItems: "center",
    color: "#07BEB8",
    cursor: "pointer",
    "& svg": {
      marginLeft: "1rem",
      transition: "ease-in-out 0.5s",
    },
    "&:hover": {
      "& svg:hover": {
        transform: "translateX(-10px)",
      },
    },
  },
  drawer: {
    height: "100vh",
    top: 0,
    "& > div": {
      overflowY: "visible !important",
    },
    "& > div:nth-child(3)": {
      background: "#f2f2f2",
    },
  },
  drawerMain: {
    minWidth: "50vw",
    maxWidth: "80vw",
    position: "relative",
    height: "95%",
    background: "#f2f2f2",
    padding: "1rem",
    "& > div:nth-child(2)": {
      // height: "100vh",
    },
  },
  closeButton: {
    position: "absolute",
    left: "-55px",
    top: "10vh",
    background: "#F2F2F2",
    height: "100px",
    borderRadius: "200px 0 0 200px;",
    width: "55px",
    display: "flex",
    alignItems: "center",
    color: "#07BEB8",
    cursor: "pointer",
    "& svg": {
      marginLeft: "1rem",
      transition: "ease-in-out 0.5s",
    },
    "&:hover": {
      "& svg:hover": {
        transform: "translateX(10px)",
      },
    },
  },
});

const Sidebar = ({ children, showDrawer = false, anchor = "right" }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(showDrawer);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  var modal = open ? (
    <Drawer
      anchor={anchor}
      open={open}
      className={classes.drawer}
      containerStyle={{ height: "100vh", top: 0 }}
    >
      <div className={classes.drawerMain}>
        <div className={classes.closeButton} onClick={handleToggleDrawer}>
          <DrawerArrow />
        </div>
        {children}
      </div>
    </Drawer>
  ) : (
    <div className={classes.openButton} onClick={handleToggleDrawer}>
      <DrawerArrow style={{ transform: "rotate(180deg)" }} />
    </div>
  );

  return <div className={classes.root}>{modal}</div>;
};

export default Sidebar;
