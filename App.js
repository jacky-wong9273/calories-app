import { Text, View, StatusBar } from "react-native";

// import react related utilites
import { useState } from "react";

// import theme provider
import { ThemeContext } from "./src/context/themes";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  PaperProvider,
} from "react-native-paper";
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";

// import navigation provider
import "react-native-gesture-handler";
import Router from "./src/navigation/Router";
import { UserIdProvider } from "./src/context/userContext";

UserIdProvider;
// create themes
const AppDefaultTheme = {
  ...PaperDefaultTheme,
  ...DefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...DefaultTheme.colors,
    primary: "#6767fe",
    accent: "#fb8c00",
  },
};

const AppDarkTheme = {
  ...PaperDarkTheme,
  ...DarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...DarkTheme.colors,
    primary: "#6767fe",
    accent: "#fb8c00",
    textColor: "#ddd",
  },
};

export default App = () => {
  // define themes
  const theme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <PaperProvider theme={isDarkTheme ? AppDarkTheme : AppDefaultTheme}>
        <UserIdProvider>
          <NavigationContainer
            theme={isDarkTheme ? AppDarkTheme : AppDefaultTheme}
          >
            <Router />
          </NavigationContainer>
        </UserIdProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
