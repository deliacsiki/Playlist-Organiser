import React, { useEffect, useState, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux store/actions/LoginActions";
import { Grid, Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./SignInPage.css";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    overflow: "hidden",
    backgroundImage: "linear-gradient(to right top, #07BEB8, #ffffff)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  description: {
    margin: "10%",
    textAlign: "center",
  },
  loginBtn: {
    borderRadius: "42px",
  },
}));

const SignInPage = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // get dispatchers
  const connectToSpotify = useCallback(
    () => dispatch(actions.connectToSpotify()),
    []
  );

  // get state as props
  const redirectionURL = useSelector((state) => {
    return state.login.redirectURL;
  });

  useEffect(() => {
    if (redirectionURL != null) {
      window.location.href = redirectionURL;
    }
  }, [redirectionURL]);

  const connectWithSpotifyHandler = (event) => {
    event.preventDefault();
    connectToSpotify();
  };

  return (
    <Grid container className={classes.root}>
      {props.redirectURL != null
        ? (window.location.href = props.redirectURL)
        : null}
      <Grid item xs={false} sm={4} md={7} className={classes.image}></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={3} square>
        <div className={classes.paper}>
          <div className="loader">
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
          </div>
          <Typography
            component="h1"
            variant="h5"
            className={classes.description}
          >
            Your favourite music and your favourite friends together in one
            place
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.loginBtn}
            onClick={connectWithSpotifyHandler}
          >
            Sign in with Spotify
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
