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
      flexDirection: "row",
      paddingHorizontal: "5%",
    },
    changeTabContainer: {
      width: "15%",
      justifyContent: "center",
      alignItems: "center",
    },
    changeTab: {
      backgroundColor: isDarkTheme ? "#242424" : "#dbdbdb",
      borderRadius: 20,
      width: 40,
    },
    content: {
      justifyContent: "center",
      alignItems: "center",
      width: "70%",
    },

    // general styles for tab
    tab: {
      alignContent: "center",
    },
  });
  return styles;
};

export { createStyles };
