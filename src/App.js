import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInPage from "./Authentication/SignInPage/SignInPage";
import RoomPage from "./Rooms/RoomPage/RoomPage";
import PlaylistPage from "./Playlists/PlaylistPage/PlaylistPage";

import "./App.css";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/home" component={RoomPage} />
      <Route path="/room" component={PlaylistPage} />
      <Route path="/" component={SignInPage} />
      <Redirect to="/" />
    </Switch>
  );

  return <React.Fragment>{routes}</React.Fragment>;
};

export default App;
