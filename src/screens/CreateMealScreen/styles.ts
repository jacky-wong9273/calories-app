import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "tomato",
    borderRadius: 30,
    padding: 16,
  },
  modalContainer: {
    flex: 1,

    alignItems: "center",
    width: "100%",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  button: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: "#242424",
  },
  background: { backgroundColor: "#242424", borderRadius: 10 },
});

export default styles;
