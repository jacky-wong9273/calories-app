import { useState } from "react";

// import uis
import { View, TouchableOpacity } from "react-native";
import { Title, Caption, Text } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// import styles and themes
import { createStyles } from "../OnBoardingScreen/styles";
import { useTheme } from "react-native-paper";

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

  const tabs = [
    // tab 1

    <Text>tab1</Text>,
    // tab 2
    <Text>tab2</Text>,
    // tab 3
    <Text>tab3</Text>,
    // tab 4
    <Text>tab4</Text>,
    // tab 5
    <Text>tab5</Text>,
  ];
  const maxTab = tabs.length;

  return (
    <View style={styles.root}>
      {/* chevron left button */}
      <View style={styles.changeTabContainer}>
        {tab > 1 && (
          <TouchableOpacity
            style={styles.changeTab}
            onPress={() => handleChangeTab(-1)}
          >
            <Icon name="chevron-left" color={colors.primary} size={30} />
          </TouchableOpacity>
        )}
      </View>

      {/* tab content */}
      <View style={styles.content}>{tabs[tab]}</View>

      {/* chevron right button */}
      <View style={styles.changeTabContainer}>
        {tab < maxTab && (
          <TouchableOpacity
            style={styles.changeTab}
            onPress={() => handleChangeTab(1)}
          >
            <Icon name="chevron-right" color={colors.primary} size={40} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OnBoardingScreen;
