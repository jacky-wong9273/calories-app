import React from "react";

// import tab navigators
import HomeTabNavigator from "./TabNavigator/HomeTabNavigator";

// import screens
import OnBoardingScreen from "../screens/OnBoardingScreen";

// import main stack creator
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"On Board"}
        component={OnBoardingScreen}
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
