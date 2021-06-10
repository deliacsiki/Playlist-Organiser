import React from "react";

import { withStyles } from "@material-ui/core";

const styles = {
  root: {
    margin: "2rem 2rem 2rem 0",
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
};

class VoteCard extends React.Component {
  render() {
    const { song, key, classes } = this.props;
    // clientId: clientId,
    // clientName:
    // clientProfile
    // song: {
    //   id: songId,
    //   uri: fetchedTrack.body.uri,
    //   name: fetchedTrack.body.name,
    //   artist: fetchedTrack.body.artists
    //     .map((artist) => artist.name)
    //     .join(", "),
    //   albumImg: fetchedTrack.body.album.images[0].url || "",
    // },
    // votesYes: 0,
    // votesNo: 0,
    return (
      <div key={key} className={classes.root}>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VoteCard);
