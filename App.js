import React, { useState } from "react";

// Custom fonts
import * as Font from "expo-font";
// Prolong splash screen until fonts are loaded into app
import { AppLoading } from "expo";

import { enableScreens } from "react-native-screens";

// Navigation
import MealsNavigator from "./navigation/MealsNavigator";

// Redux
import { createStore, combineReducers } from "redux";
import mealsReducer from "./store/reducers/meals";

// React redux
import { Provider } from "react-redux";

enableScreens();

const rootReducer = combineReducers({ meals: mealsReducer });

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
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
      <MealsNavigator />
    </Provider>
  );
}
