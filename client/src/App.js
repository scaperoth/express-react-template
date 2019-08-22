import React, { Component } from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./store";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }
}
export default App;
