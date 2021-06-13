import React from "react";
import { Button } from "@material-ui/core";
import VoteCard from "./VoteCard/VoteCard";

class VotingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVoting: true,
      showSearchResults: false,
    };
  }

  componentDidMount() {}

  render() {
    const { songsList } = this.props;
    return (
      <div style={{ height: "100%", overflow: "auto", marginTop: "1rem" }}>
        {songsList.length != 0
          ? songsList.map((song) => {
              return (
                <VoteCard
                  song={song}
                  onVote={this.props.onVote}
                  key={song.id}
                />
              );
            })
          : null}
      </div>
    );
  }
}

export default VotingList;
