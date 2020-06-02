import { StyleSheet, Dimensions } from "react-native";

const authStyles = StyleSheet.create({
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "80%",
  },

  inputs: {
    borderWidth: 1,
    borderRadius: 7,
    width: "100%",
    borderColor: "#dadada",
    marginVertical: 10,
    paddingVertical: 7,
    backgroundColor: "#fafafa",
    fontSize: 17,
    paddingLeft: 15,
  },

  submit: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#3897f1",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
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
  title: {
    fontFamily: "michella-garden",
    fontSize: 80,
    fontWeight: "200",
  },
  dividerText: {
    marginTop: 15,
    flexDirection: "row",
  },
  dividerLine: {
    borderWidth: 0.5,
    borderColor: "black",
    marginVertical: 10,
    flex: 1,
  },
});

export default authStyles;
