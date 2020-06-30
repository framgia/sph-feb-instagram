import React from "react";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import firebase from "../../configs/firebase";
import { setAuthUser } from "../../actions/userActions";

class EditProfile extends React.Component {
  state = {
    password: "",
    loggedInWith: "",
    isUpdated: false,
    newImage: null,
    showPassword: false,
    bio: this.props.user.bio,
    email: this.props.user.email,
    photo: this.props.user.photo,
    username: this.props.user.username,
    authRef: firebase.auth().currentUser,
    userRef: firebase.firestore().collection("users").doc(this.props.user.uid),
  };

  componentDidMount() {
    this.setState({
      loggedInWith: this.state.authRef.providerData[0].providerId,
    });
  }

  update = async () => {
    const { username, email, bio, password } = this.state;
    const user = this.state.authRef;

    user.updateProfile({
      bio: bio,
      email: email,
      displayName: username,
    });

    if (password !== "") {
      user.updatePassword(password);
    }

    if (this.state.newImage) {
      const newImageUrl = await this.upload();
      this.state.userRef.update({
        photo: newImageUrl,
      });
    }

    const updatedUser = this.state.userRef
      .update({
        username,
        email,
        bio,
      })
      .then(() => {
        this.state.userRef.get().then((doc) => {
          this.props.dispatch(setAuthUser(doc.data()));
        });
      });

    this.setState({ isUpdated: true });
    setTimeout(() => this.setState({ isUpdated: false }), 2000);
  };

  openLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ newImage: result.uri, photo: result.uri });
    }
  };

  uriToBlob = () => {
    const uri = this.state.newImage;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => resolve(xhr.response);
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  upload = async () => {
    const blob = await this.uriToBlob();
    const upload = await firebase.storage().ref(this.uuidv4()).put(blob);

    const downloadUrl = await upload.ref.getDownloadURL();

    return downloadUrl;
  };

  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  render() {
    const {
      username,
      photo,
      email,
      bio,
      password,
      loggedInWith,
      showPassword,
      isUpdated,
    } = this.state;

    return (
      <ScrollView>
        <ImageBackground
          source={require("../../assets/images/bgradient.png")}
          style={editStyles.bgHeader}
        >
          <View
            style={{
              width: "100%",
              paddingLeft: 20,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <MaterialIcons name="chevron-left" size={32} color="white" />
              <Text style={{ fontSize: 20, color: "#fff" }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={editStyles.dname}>{username}</Text>
            <Image
              source={{
                uri: photo,
              }}
              style={editStyles.profileImg}
            />
            <TouchableOpacity onPress={this.openLibrary}>
              <Text>Change Photo</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* Form */}
        <View style={editStyles.form}>
          <View style={editStyles.formGroup}>
            <MaterialIcons
              name="person-outline"
              size={40}
              color="rgba(179, 0, 255, 0.39)"
            />
            <TextInput
              style={editStyles.inputField}
              value={username}
              placeholder="name"
              onChangeText={(input) => this.setState({ username: input })}
            />
          </View>

          <View style={editStyles.formGroup}>
            <MaterialCommunityIcons
              name="email-outline"
              size={37}
              color="rgba(179, 0, 255, 0.39)"
            />
            <TextInput
              style={editStyles.inputField}
              value={email}
              placeholder="email"
              onChangeText={(input) => this.setState({ email: input })}
            />
          </View>
          {loggedInWith !== "facebook.com" && (
            <View style={editStyles.formGroup}>
              <MaterialIcons
                name="lock-outline"
                size={40}
                color="rgba(179, 0, 255, 0.39)"
              />
              <TextInput
                style={editStyles.inputField}
                value={password}
                secureTextEntry={!showPassword}
                placeholder="Password"
                onChangeText={(input) => this.setState({ password: input })}
              />
              <TouchableOpacity
                onPress={() => this.setState({ showPassword: !showPassword })}
              >
                <MaterialCommunityIcons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={30}
                  color="rgba(179, 0, 255, 0.6)"
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={editStyles.formGroup}>
            <FontAwesome
              name="pencil-square-o"
              size={37}
              color="rgba(179, 0, 255, 0.39)"
            />
            <TextInput
              style={editStyles.inputField}
              value={bio}
              placeholder="bio"
              onChangeText={(input) => this.setState({ bio: input })}
            />
          </View>

          <View style={editStyles.buttonWrapper}>
            <TouchableOpacity style={editStyles.submit} onPress={this.update}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "rgba(179, 0, 255, 0.39)",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal transparent={true} visible={isUpdated}>
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/check.gif")}
              style={{ height: 200, width: 200 }}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const editStyles = StyleSheet.create({
  bgHeader: {
    height: 250,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
  dname: {
    color: "white",
    fontSize: 27,
  },
  profileImg: {
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 1,
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  formGroup: {
    height: 70,
    borderBottomWidth: 1,
    borderColor: "rgba(186, 186, 186, 0.89)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  inputField: {
    marginLeft: 10,
    height: 70,
    flex: 1,
    fontSize: 17,
    color: "#a1a1a1",
  },
  buttonWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  submit: {
    width: 150,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(179, 0, 255, 0.39)",
    borderWidth: 2,
    borderRadius: 99,
  },
});

const mapStateToProps = (state) => ({
  user: state.user.auth,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
