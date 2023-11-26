import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "grey",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  confirmBtn: {
    marginTop: 10,
  },
  cancelBtn: {
    alignItems: "flex-end",
  },
  modalContent: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  input: {
    height: 30,
    borderColor: "gray",
    justifyContent: "center",
    width: "60%",
  },
  background: { backgroundColor: "#242424", borderRadius: 10 },
  nopermission: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // datum row
  datumRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    alignContent: "center",
    marginVertical: 10,
  },
  datumRowDescription: {
    height: "100%",
    justifyContent: "center",
  },
});

export default styles;
