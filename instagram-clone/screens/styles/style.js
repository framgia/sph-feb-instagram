import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    width: Dimensions.get("window").width,
  },
  headerTitle: {
    fontFamily: "michella-garden",
    fontSize: 40,
    fontWeight: "200",
  },
  loading: {
    backgroundColor: "rgba(2, 5, 5, .8)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
});

export default styles;
