import { StyleSheet } from "react-native";

export const mealDetailsStyle = StyleSheet.create({
  image: {
    width: "100%",
    height: 180,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  mealRow: {},
  meailDetail: {},
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
