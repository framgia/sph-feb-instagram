import React from "react";
import TabNavigator from "./navigation/TabNavigator";

import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./reducers";

const store = createStore(rootReducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    );
  }
}

export default App;
