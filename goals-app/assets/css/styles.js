import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    minHeight: "100%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    borderColor: "#000000",
    borderWidth: 2,
    backgroundColor: "#ffffff",
    width: "80%",
    height: 40,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header: {
    backgroundColor: "#8D99FF",
    justifyContent: "center",
    paddingLeft: 10,
    height: 100,
  },
  taskPanel: {
    paddingHorizontal: 15,
    padding: 10,
    flexGrow: 1,
  },

  goalWrapper: {
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 0.5,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  addGoalButton: {
    backgroundColor: "#8D99FF",
    width: 60,
    height: 60,
    marginLeft: 0,
    position: "absolute",
    bottom: 20,
    borderRadius: 9999,
    right: 20,
  },

  goalButtonText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});
