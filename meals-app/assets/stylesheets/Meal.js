import { StyleSheet } from "react-native";

export const mealsStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    marginVertical: 10,
  },
  mealHeader: {
    height: "86%",
  },
  mealDetail: {
    height: "14%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  bgImage: {
    width: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0, 0.2)",
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
});
