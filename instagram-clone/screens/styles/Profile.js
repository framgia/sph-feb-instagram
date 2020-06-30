import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  gallery: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginHorizontal: 3,
    paddingTop: 15,
  },
  imgTile: {
    height: Dimensions.get("window").width / 3.5,
    width: Dimensions.get("window").width / 3.5,
    marginVertical: 5,
    marginLeft: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#7710c6",
  },
  profileImg: {
    height: 110,
    width: 110,
    borderRadius: 99,
    borderColor: "#fff",
    borderWidth: 1,
  },
  editButton: {
    width: "95%",
    alignItems: "center",
    borderWidth: 1.5,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 6,
    borderColor: "rgba(184, 184, 184, 0.9)",
  },
  label: {
    color: "rgba(184, 184, 184, 0.9)",
    fontSize: 16,
  },
  bio: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.77)",
  },
  bscinf: {
    flex: 1,
  },
  details: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  inf: {
    flex: 1,
    marginLeft: 10,
    paddingBottom: 6,
  },
  header: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  dName: {
    fontSize: 23,
    flex: 1,
    color: "#fff",
    marginTop: 10,
  },
});
