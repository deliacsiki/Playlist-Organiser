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
    "& h4": {
      marginTop: "0 !important",
    },
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
    "& img": {
      marginLeft: "1rem",
    },
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
  votingScores: {
    display: "flex",
    justifyContent: "flex-end",
    "& > div": {
      width: "40px",
      height: "40px",
      textAlign: "center",
    },
  },
};

class VoteCard extends React.Component {
  state = {
    userId: null,
  };

  componentDidMount() {
    this.setState({
      userId: localStorage.getItem("userId"),
    });
  }

  render() {
    const { song, classes, onVote } = this.props;

    return (
      <div key={song.id} className={classes.root}>
        <div>
          <img
            src={
              song.clientProfile ||
              "https://cdn.pixabay.com/photo/2016/12/02/12/06/background-1877690_960_720.jpg"
            }
          />
        </div>
        <div className={classes.rightSection}>
          <h4>{`${song.clientName} wants this song:`}</h4>
          <div className={classes.whiteCard}>
            <div className={classes.songSection}>
              <div>
                <p>
                  <b>{song.data.name}</b>
                </p>
                <p>{song.data.artists.map((song) => song.name).join(", ")}</p>
              </div>
              <img src={song.data.albumImg} />
            </div>
            <div className={classes.hr}></div>
            <div className={classes.votingSection}>
              {song.clientsWhoVoted.includes(this.state.userId) ? (
                <React.Fragment>
                  <p>Current votes on this song:</p>
                  <div className={classes.votingScores}>
                    <div className={classes.votesYes}>{song.votesYes}</div>
                    <div className={classes.votesNo}>{song.votesNo}</div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p>Do you want this song to be added to the queue?</p>

                  <div className={classes.votingIcons}>
                    <CheckmarkIcon
                      height="40px"
                      width="40px"
                      className={classes.checkmarkIcon}
                      onClick={() => onVote("yes", song.data.id)}
                    />
                    <CloseIcon
                      height="40px"
                      width="40px"
                      className={classes.closeIcon}
                      onClick={() => onVote("no", song.data.id)}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VoteCard);
