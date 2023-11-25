import React from "react";

// import tab navigators
import HomeTabNavigator from "./TabNavigator/HomeTabNavigator";

// import screens
import HomeScreen from "../screens/HomeScreen";
import OnBoardScreen from "../screens/OnBoardScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";

// import main stack creator
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"OnBoard"}
        component={OnBoardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Login"}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={"HomeTab"}
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
