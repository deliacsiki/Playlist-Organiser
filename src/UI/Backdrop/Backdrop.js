import { Button, makeStyles } from "@material-ui/core";
import cssClasses from "./Backdrop.module.css";

const useStyles = makeStyles({
  backdropContent: {
    backgroundColor: "white",
    borderRadius: "10px",
    minWidth: "50%",
    maxWidth: "80%",
    height: "80%",
    margin: "2rem auto",
    padding: "1rem",
    position: "relative",
    overflow: "hidden",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

const Backdrop = ({ children, toggleBackdrop }) => {
  const classes = useStyles();
  return (
    <div className={cssClasses.BackdropBackground}>
      <div className={classes.backdropContent}>
        <Button className={classes.closeBtn} onClick={toggleBackdrop}>
          X
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
