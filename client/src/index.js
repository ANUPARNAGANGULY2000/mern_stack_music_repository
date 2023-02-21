import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./contaxt/StateProvider";
import {initialState} from "./contaxt/initialState";
import reducer from "./contaxt/reducer";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState}  reducer={reducer}>
      <App />
      </StateProvider>
     
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
