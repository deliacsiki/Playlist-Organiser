import React from "react";

import { withStyles } from "@material-ui/core";
import CheckmarkIcon from "../../../resources/icons/CheckmarkIcon";
import CloseIcon from "../../../resources/icons/CloseIcon";

const styles = {
  root: {
    margin: "2rem",
    minHeight: "200px",
    display: "flex",
    "& img": {
      maxHeight: "72px",
      maxWidth: "72px",
      borderRadius: "10px",
    },
  },
  rightSection: {
    paddingLeft: "1rem",
  },
  whiteCard: {
    marginTop: "-0.4rem",
    padding: "1rem 1.5rem",
    background: "white",
    borderRadius: "0 10px 10px 10px",
  },
  songSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  hr: {
    height: "1px",
    background: "#E5E5E5",
  },
  votingSection: {
    marginTop: "1rem",
  },
  votingIcons: {
    display: "flex",
    justifyContent: "flex-end",
    "& svg": {
      marginLeft: "1rem",
      cursor: "pointer",
      transition: "ease-in-out 0.4s",
    },
  },
  checkmarkIcon: {
    "& :hover": {
      "& path": {
        fill: "#418F3D",
      },
    },
  },
  closeIcon: {
    "& :hover": {
      "& path": {
        fill: "#CC0000",
      },
    },
  },
};

class VoteCard extends React.Component {
  render() {
    const { song, classes, onVote } = this.props;
    
    return (
      <div key={song.id} className={classes.root}>
        <div>
          <img src={song.clientProfile} />
        </div>
        <div className={classes.rightSection}>
          <h4>{`${song.clientName} wants this song:`}</h4>
          <div className={classes.whiteCard}>
            <div className={classes.songSection}>
              <div>
                <p>
                  <b>{song.song.name}</b>
                </p>
                <p>{song.song.artist}</p>
              </div>
              <img src={song.song.albumImg} />
            </div>
            <div className={classes.hr}></div>
            <div className={classes.votingSection}>
              <p>Do you want this song to be added to the queue?</p>
              <div className={classes.votingIcons}>
                <CheckmarkIcon
                  height="40px"
                  width="40px"
                  className={classes.checkmarkIcon}
                  onClick={() => onVote("yes", song.id)}
                />
                <CloseIcon
                  height="40px"
                  width="40px"
                  className={classes.closeIcon}
                  onClick={() => onVote("no", song.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VoteCard);
