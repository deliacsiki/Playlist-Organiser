import { Button, makeStyles, Modal } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  modalRoot: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "1rem",
    width: "80%",
    height: "80%",
    overflow: "hidden",
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "1rem",
  },
});

const FormModal = ({ form = null, showModal, closeModal, modalCloseRef }) => {
  const classes = useStyles();

  var modal = showModal ? (
    <div className={classes.backdrop}>
      <div className={classes.modalRoot}>
        <Button
          onClick={closeModal}
          ref={modalCloseRef}
          className={classes.closeBtn}
        >
          CLOSE
        </Button>
        <br />
        {form}
      </div>
    </div>
  ) : null;

  return modal;
};

export default FormModal;
