import { StyleSheet } from "react-native";

// import contexts
import { ThemeContext } from "../../context/themes";
import { useContext } from "react";
import { useTheme } from "react-native-paper";

// use a function to create styles with context rendered
const createStyles = () => {
  // get context
  const { isDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",

      paddingHorizontal: "5%",
    },

    // main content
    content: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "60%",
      padding: 20,
    },

    // bottom buttons
    bottomRow: {
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    changeTabContainer: {
      width: "30%",
      justifyContent: "center",
      alignItems: "center",
    },
    changeTab: {
      backgroundColor: isDarkTheme ? "#242424" : "#dbdbdb",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      height: 50,
      width: 60,
    },
    getStarted: {
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      height: 40,
      width: 100,
    },

    // general styles for tab
    tab: {
      width: "100%",
      alignContent: "center",
    },

    // tab 1
    title: {
      fontSize: 25,
      marginVertical: 20,
      alignSelf: "center",
      textAlign: "center",
    },
    caption: {
      marginVertical: 20,
      fontSize: 16,
      alignSelf: "center",
      textAlign: "center",
    },

    imageContainer: {
      alignItems: "center",
    },

    // skip on boarding
    skip: {
      alignItems: "center",
      marginTop: 20,
    },
    skipText: {
      color: isDarkTheme ? "#767676" : "#898989",
      textDecorationLine: "underline",
    },
  });
  return styles;
};

export { createStyles };
