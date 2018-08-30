import React, { Component } from "react";
import { Provider } from "react-redux";

import NavbarApp from "../NavbarApp/NavbarApp";
import Content from "../Content/Content";

import store from "../../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <NavbarApp />
          <Content />
        </div>
      </Provider>
    );
  }
}

export default App;
