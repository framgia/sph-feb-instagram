import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  userImg: {
    height: 70,
    width: 70,
    borderRadius: 99,
  },
  description: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
