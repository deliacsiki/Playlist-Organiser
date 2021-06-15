import { useCallback, useEffect, useState } from "react";
import * as classes from "./SongCard.module.css";
import clsx from "clsx";
import { Button } from "@material-ui/core";

const SongCard = ({
  song,
  onClick,
  style,
  withAlbumArt = false,
  withHover = true,
  withSkipButton = false,
  onSkip,
}) => {
  const [artistsLabel, setArtistsLabel] = useState("Artist unknown");

  useEffect(() => {
    if (song.artists) {
      setArtistsLabel(song.artists.map((artist) => artist.name).join(", "));
    }
  }, []);

  const SkipBtn = (
    <Button
      onClick={onSkip}
      style={{
        position: "absolute",
        right: "2rem",
        top: 0,
        color: "white",
      }}
    >
      SKIP
    </Button>
  );

  var songCard = (
    <div
      className={clsx(
        classes.SongCard,
        withHover ? classes.SongCardWithHover : ""
      )}
      onClick={onClick}
      style={style}
    >
      <p className={classes.SongName}>{song.name}</p>
      <p>{artistsLabel}</p>
      {withSkipButton ? SkipBtn : null}
    </div>
  );

  if (withAlbumArt)
    songCard = (
      <div
        className={clsx(
          classes.SongCard,
          classes.DisplayFlex,
          withHover ? classes.SongCardWithHover : ""
        )}
        onClick={onClick}
        style={style}
      >
        <img src={song.albumImg || song.album.images[0].url} className={classes.AlbumImg} />
        <div style={{ width: "100%", position: "relative" }}>
          <p className={classes.SongName}>{song.name}</p>
          <p>{artistsLabel}</p>
          {withSkipButton ? SkipBtn : null}
        </div>
      </div>
    );

  return songCard;
};

export default SongCard;
