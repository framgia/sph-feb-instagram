import React, { Component } from "react";
import { connect } from "react-redux";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import firebase from "../../configs/firebase";

import profileStyles from "../styles/Profile";

class Profile extends Component {
  state = {
    postRef: firebase.firestore().collection("posts"),
    images: [],
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async () => {
    this.state.postRef
      .where("uid", "==", this.props.user.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            images: [...this.state.images, doc.data().postPhoto],
          });
        });
      });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {});
  };
  render() {
    const { photo, username, bio } = this.props.user;

    return (
      <ImageBackground
        source={require("../../assets/images/bgradient.png")}
        style={{ height: "100%" }}
      >
        <StatusBar translucent barStyle="light-content" />
        <View resizeMode="cover" style={profileStyles.header}>
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
              marginRight: 50,
              paddingTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={this.logout}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ color: "white", marginRight: 2 }}>Logout</Text>
              <MaterialCommunityIcons name="logout" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={profileStyles.details}>
            <Image
              source={{
                uri: photo,
              }}
              style={profileStyles.profileImg}
            />
            <View style={profileStyles.inf}>
              <View style={profileStyles.bscinf}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={profileStyles.dName}>{username}</Text>
                </View>
                <Text style={profileStyles.label}>Nothing</Text>
              </View>
              <Text style={profileStyles.bio}>{bio}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Edit Profile")}
            style={profileStyles.editButton}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={profileStyles.gallery}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {/* marginLeft every first */}

            {this.state.images.map((image, index) => {
              if (index % 3 == 0) {
                return (
                  <Image
                    source={{ uri: image }}
                    key={index}
                    style={{ ...profileStyles.imgTile, marginLeft: 15 }}
                  />
                );
              } else {
                return (
                  <Image
                    source={{ uri: image }}
                    key={index}
                    style={profileStyles.imgTile}
                  />
                );
              }
            })}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.auth,
});

export default connect(mapStateToProps)(Profile);
