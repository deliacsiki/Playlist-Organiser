import { Button, makeStyles, Drawer } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {
    zIndex: 100,
    position: "relative",
  },
  openButton: {
    position: "absolute",
    right: 0,
    top: "20vh",
    background: "#25283D",
    height: "150px",
    borderRadius: "200px 0 0 200px;",
    width: "75px",
    display: "flex",
    alignItems: "center",
    color: "#07BEB8",
    cursor: "pointer",
  },
  drawer: {
    "& > div": {
      overflowY: "visible !important",
    },
  },
  drawerMain: {
    minWidth: "20vw",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    left: "-75px",
    top: "20vh",
    background: "#F2F2F2",
    height: "150px",
    borderRadius: "200px 0 0 200px;",
    width: "75px",
    display: "flex",
    alignItems: "center",
    color: "#07BEB8",
    cursor: "pointer",
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
      variant="persistent"
      open={open}
      className={classes.drawer}
    >
      <div className={classes.drawerMain}>
        <div className={classes.closeButton} onClick={handleToggleDrawer}>
          CLOSE
        </div>
        {children}
      </div>
    </Drawer>
  ) : (
    <div className={classes.openButton} onClick={handleToggleDrawer}>
      OPEN
    </div>
  );

  return <div className={classes.root}>{modal}</div>;
};

export default Sidebar;
