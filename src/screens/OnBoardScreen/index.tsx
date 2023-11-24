import { useState } from "react";

// import uis
import { View, TouchableOpacity, Image } from "react-native";
import { Title, Caption, Text, Button } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// import styles and themes
import { createStyles } from "./styles";
import { useTheme } from "react-native-paper";

// import illustartion image
const Tab1Image = require("../../assets/OnBoardScreen/tab1.jpg");
const Tab2Image = require("../../assets/OnBoardScreen/tab2.jpg");
const Tab3Image = require("../../assets/OnBoardScreen/tab3.jpg");
const Tab4Image = require("../../assets/OnBoardScreen/tab4.jpg");

const OnBoardingScreen = () => {
  // create styles and themes
  const styles = createStyles();

  // store states
  const [tab, setTab] = useState<number>(1);
  const { colors } = useTheme();

  // handle change tab
  const handleChangeTab = (value: 1 | -1) => {
    setTab(tab + value);
  };

  // get started
  const getStarted = () => {
    // todo
  };

  // skip on board
  const skipOnBoard = () => {
    // todo
  };

  const tabs = [
    // tab 1
    <View style={styles.tab}>
      <Text style={[styles.title, { alignSelf: "flex-start" }]}>
        Welcome to Calories-app!
      </Text>
      <Text
        style={[styles.caption, { alignSelf: "flex-start", textAlign: "left" }]}
      >
        In this app, you can explore on intelligent diet and workout plans
        designed for you.
      </Text>
    </View>,
    // tab 2
    <View style={styles.tab}>
      <View style={styles.imageContainer}>
        <Image
          source={Tab1Image}
          style={{ width: 400, height: 350, alignSelf: "center" }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.caption}>
        Explore workout plans and meal plans to reach your goals.
      </Text>
    </View>,
    // tab 3
    <View style={styles.tab}>
      <View style={[styles.imageContainer, { flexDirection: "row" }]}>
        <Image
          source={Tab3Image}
          style={{ width: 200, height: 350, alignSelf: "center" }}
          resizeMode="contain"
        />
        <Image
          source={Tab4Image}
          style={{ width: 200, height: 350, alignSelf: "center" }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.caption}>
        Explore workout plans and meal plans to reach your goals.
      </Text>
    </View>,
    // tab 4
    <Text>tab4</Text>,
    // tab 5
    <Text>tab5</Text>,
  ];
  const maxTab = tabs.length;

  return (
    <View style={styles.root}>
      {/* tab content */}
      <View style={styles.content}>{tabs[tab - 1]}</View>

      {/* button navigation */}
      <View style={styles.bottomRow}>
        {/* chevron left button */}
        <View style={styles.changeTabContainer}>
          {tab > 1 && (
            <TouchableOpacity
              style={styles.changeTab}
              onPress={() => handleChangeTab(-1)}
            >
              <Icon name="chevron-left" color={"#4d4d4d"} size={30} />
            </TouchableOpacity>
          )}
        </View>

        {/* getting started button */}
        <View style={styles.changeTabContainer}>
          {tab == maxTab && (
            <TouchableOpacity style={styles.getStarted} onPress={getStarted}>
              <Text>Start</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* chevron right button */}
        <View style={styles.changeTabContainer}>
          {tab < maxTab && (
            <TouchableOpacity
              style={styles.changeTab}
              onPress={() => handleChangeTab(1)}
            >
              <Icon name="chevron-right" color={colors.primary} size={30} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* skip onboard screen */}
      <TouchableOpacity style={styles.skip} onPress={skipOnBoard}>
        <Text style={styles.skipText}>I have an account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardingScreen;
