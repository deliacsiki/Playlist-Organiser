import { useCallback, useEffect, useState } from "react";
import * as classes from "./SongCard.module.css";

const SongCard = ({ song, onClick }) => {
  const [artistsLabel, setArtistsLabel] = useState("Artist unknown");

  useEffect(() => {
    if (song.artists) {
      setArtistsLabel(song.artists.map((artist) => artist.name).join(", "));
    }
  }, []);

  return (
    <div className={classes.SongCard} onClick={onClick}>
      <p className={classes.SongName}>{song.name}</p>
      <p>{artistsLabel}</p>
    </div>
  );
};

export default SongCard;
