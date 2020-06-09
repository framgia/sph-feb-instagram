import { StyleSheet, Dimensions } from "react-native";

const homeStyles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    borderColor: "#d3d3d3",
    borderWidth: 0.3,
  },
  cardWrapper: {
    width: Dimensions.get("window").width,
    backgroundColor: "white",
  },
  card: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 20,
    borderTopColor: "#d3d3d3",
    borderTopWidth: 0.7,
  },
  cardHeader: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerData: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
  },
  avatar: {
    borderRadius: 999,
    overflow: "hidden",
    marginRight: 7,
    height: 40,
    width: 40,
  },
  userName: {
    fontWeight: "bold",
  },
  headerAction: {
    justifyContent: "center",
  },
  footerActions: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  actionRight: {
    flexDirection: "row",
    width: "30%",
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default homeStyles;
