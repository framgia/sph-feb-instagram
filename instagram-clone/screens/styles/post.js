import { StyleSheet, Dimensions } from "react-native";

const postStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3f3f3",
  },
  image: {
    height: 250,
    marginTop: 50,
    width: Dimensions.get("window").width,
  },
  input: {
    borderBottomColor: "#dadada",
    borderBottomWidth: 1,
    width: Dimensions.get("window").width * 0.8,
    marginTop: 20,
    fontSize: 17,
    height: 40,
  },
  button: {
    borderColor: "#dadada",
    borderWidth: 3,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
    width: 100,
    borderRadius: 10,
    alignItems: "center",
  },
  location: {
    width: "80%",
    marginTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    justifyContent: "center",
    borderBottomColor: "#dadada",
    borderBottomWidth: 1,
  },
});

export default postStyles;
