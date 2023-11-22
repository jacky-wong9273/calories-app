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

    // user info section
    userSection: {
      backgroundColor: isDarkTheme ? "#141414" : "#f7f7f7",
    },
    userColumnContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },

    // user card container
    userCard: {
      padding: 10,
      width: "100%",
      backgroundColor: "#2d2d2d",
      marginVertical: 10,
      borderRadius: 15,
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
    bio: {
      marginVertical: 5,
      paddingHorizontal: 5,
      maxHeight: 60,
      overflow: "scroll",
    },
    featureTags: {
      marginTop: 10,
      flexDirection: "row",
    },
    featureTagContainer: {
      padding: 4,
      marginRight: 4,
      borderRadius: 10,
    },
    featureTag: {
      fontSize: 10,
    },

    // user column
    userColumn: {
      width: "46%",
    },

    // info placeholder
    infoPlaceholder: {
      marginTop: 40,
      marginBottom: 50,
      borderRadius: 15,
      height: 80,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    infoHeader: {
      color: colors.primary,
      opacity: 0.85,
      fontSize: 22,
    },

    // search bar
    searchBar: {
      marginTop: 20,
      width: "90%",
    },
  });
  return styles;
};

export { createStyles };
