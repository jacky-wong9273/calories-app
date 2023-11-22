import * as React from "react";

// import stack navigators
import HomeScreen from "../../screens/HomeScreen";
import BarcodeScanner from "../../screens/BarcodeScanner";
import ExploreScreen from "../../screens/ExploreScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import CreateMealScreen from "../../screens/CreateMealScreen";

// import icon library
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// import bottom tab navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerLeft: () => (
            <Icon
              style={{ marginLeft: 15 }}
              name="menu"
              color={"#eee"}
              size={30}
            />
          ),
          headerRight: () => (
            <Icon
              style={{ marginRight: 15 }}
              name="dots-vertical"
              color={"#eee"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="compass-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            <Icon
              style={{ marginLeft: 15 }}
              name="menu"
              color={"#eee"}
              size={30}
            />
          ),
          headerRight: () => (
            <Icon
              style={{ marginRight: 15 }}
              name="dots-vertical"
              color={"#eee"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Record"
        component={CreateMealScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="food" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
          headerLeft: () => (
            <Icon
              style={{ marginLeft: 15 }}
              name="menu"
              color={"#eee"}
              size={30}
            />
          ),
          headerRight: () => (
            <Icon
              style={{ marginRight: 15 }}
              name="dots-vertical"
              color={"#eee"}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
