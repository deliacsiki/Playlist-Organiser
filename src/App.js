import React from "react";
import {Switch, Route} from "react-router-dom";
import SignInPage from "./Authentication/SignInPage/SignInPage";
import RoomPage from "./Rooms/RoomPage/RoomPage";

import "./App.css";


const App = () => {

  return (
    <React.Fragment>
      <Switch>
        <Route path="/signin" component={SignInPage} />
        <Route path="/" component={RoomPage} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
