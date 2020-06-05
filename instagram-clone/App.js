import * as Font from "expo-font";
import { AppLoading } from "expo";
import "react-native-gesture-handler";
import React, { useState } from "react";
import MainNavigator from "./navigation";
import * as Facebook from "expo-facebook";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { YellowBox } from "react-native";

import rootReducer from "./reducers";

// Reducers
const store = createStore(rootReducer);

//Facebook
Facebook.initializeAsync("550263242330720", "Photogram");

YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);

// Fonts
const fetchFonts = () => {
  return Font.loadAsync({
    "michella-garden": require("./assets/fonts/Michella-Garden.ttf"),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
