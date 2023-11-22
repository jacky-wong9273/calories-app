import { StyleSheet } from "react-native";

// import contexts
import { ThemeContext } from "../../context/themes";
import { useContext } from "react";

// use a function to create styles with context rendered
const createStyles = () => {
  // get context
  const { isDarkTheme } = useContext(ThemeContext);

  // initialize styles
  const styles = StyleSheet.create({
    // root container
    container: {
      flex: 1,
    },

    // user info section
    userSection: {
      backgroundColor: isDarkTheme ? "#141414" : "#f7f7f7",
    },

    // user background container
    background: {
      position: "absolute",
      height: 100,
      width: "100%",
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
    },

    // user card container
    userCard: {
      padding: 30,
    },
    avatarContainer: {
      backgroundColor: "red",
      width: 100,
      borderRadius: 50,
    },
    name: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tagContainer: {
      backgroundColor: "#dddddd",
      paddingVertical: 2,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    tag: {
      color: "#777",
    },
    buttonRow: {
      marginTop: 10,
      flexDirection: "row",
    },
    editButton: {
      backgroundColor: isDarkTheme ? "#242424" : "#e7e7e7",
      borderRadius: 10,
      width: "73%",
    },
    shareButton: {
      backgroundColor: isDarkTheme ? "#242424" : "#e7e7e7",
      borderRadius: 10,
      marginLeft: "5%",
      width: "22%",
    },
    bio: { marginVertical: 5, paddingHorizontal: 5 },
    featureTags: {
      marginTop: 10,
      flexDirection: "row",
    },
    featureTagContainer: {
      padding: 4,
      margin: 4,
      borderRadius: 10,
    },
    featureTag: {
      fontSize: 10,
    },

    // tab section
    tabSection: {
      marginTop: 10,
      backgroundColor: isDarkTheme ? "#141414" : "#f7f7f7",
    },
    tabBar: {
      backgroundColor: isDarkTheme ? "#141414" : "#f7f7f7",
    },
    tabBarIndicator: {
      backgroundColor: isDarkTheme ? "#f7f7f7" : "#141414",
    },

    // summary section
    summaryTab: {
      marginHorizontal: 20,
    },
    chartContainer: {
      alignItems: "center",
      marginTop: 15,
    },
    chartTitle: {
      fontWeight: "700",
      fontSize: 16,
    },
    chartBackground: {
      color: isDarkTheme ? "#141414" : "#f7f7f7",
    },
    // data card
    dataSection: {
      flexDirection: "column",
      alignItems: "center",
    },
    dataCardContainer: {
      flexDirection: "row",
      width: "100%",
      marginTop: 10,
      justifyContent: "space-between",
    },
    dataCard: {
      backgroundColor: isDarkTheme ? "#242424" : "#e7e7e7",
      padding: 10,
      width: "30%",
      borderRadius: 20,
      alignItems: "center",
    },
    dataCardTitle: {
      color: isDarkTheme ? "#b7b7b7" : "#474747",
    },
    percentageCard: {
      width: "100%",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },

    // history section
    history: { width: "100%", flexDirection: "column", paddingHorizontal: 20 },
    historyCard: {
      backgroundColor: isDarkTheme ? "#242424" : "#e7e7e7",
      marginTop: 10,
      padding: 10,
      borderRadius: 10,
    },
    historyDateContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    historyDate: {
      color: isDarkTheme ? "#b7b7b7" : "#474747",
      fontSize: 12,
    },
    historyImageContainer: {
      marginTop: 10,
      width: "100%",
      height: 250,
    },
    historyImage: {
      width: "100%",
      height: "100%",
    },
    historyItemTitle: {
      marginHorizontal: 3,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      width: "100%",
    },
    historyCardBottomRow: {
      marginTop: 10,
      flexDirection: "row",
    },
    historyCardBottomItem: {
      marginRight: 6,
      padding: 3,
    },
    historyCardBottomItemTitle: {
      opacity: 0.9,
    },

    historyCardBottomTag: {
      flexDirection: "row",
      marginRight: 4,
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 5,
    },
    historyCardBottomItemText: {
      fontSize: 12,
    },

    // general
    elevation: {
      shadowOffset: { width: 10, height: 100 },
      shadowColor: "black",
      shadowOpacity: 1,
      elevation: 3,
      // background color must be set
      backgroundColor: "#0000", // invisible color
    },
  });

  //return styles
  return styles;
};

export { createStyles };
