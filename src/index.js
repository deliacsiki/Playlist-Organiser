import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";
import {Provider} from "react-redux";
import {combineReducers, createStore,applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import LoginReducer from './redux store/reducers/LoginReducer';

import "./index.css";
import myTheme from "./materialTheme";

const rootReducer = combineReducers({
  login: LoginReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={myTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
