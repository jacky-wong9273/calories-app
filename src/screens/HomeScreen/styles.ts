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

  // initialize styles
  const styles = StyleSheet.create({
    // root container
    container: {
      flex: 1,
    },
    sectionContainer: {
      paddingHorizontal: 20,
    },

    target: {
      width: "100%",
      alignItems: "flex-start",
    },

    // data container
    dataCardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      paddingHorizontal: 20,
      width: "100%",
      backgroundColor: "#2d2d2d",
      borderRadius: 15,
    },
    dataCard: {
      borderRadius: 10,

      width: "50%",
      padding: 10,
      alignItems: "center",
    },
    title: {
      color: "#fff",
      fontSize: 22,
    },
    title1: {
      color: "#44dd44",
      fontSize: 22,
    },
    title2: {
      color: "#dd4444",
      fontSize: 22,
    },

    //chart
    section: {
      marginTop: 20,
      padding: 20,
      backgroundColor: "#141414",
    },

    //plans
    plan: { marginVertical: 5 },
  });

  return styles;
};

export { createStyles };
