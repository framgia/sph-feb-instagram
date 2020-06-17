import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";

import styles from "../styles/style";
import postStyles from "../styles/post";
import firebase from "../../configs/firebase";
import LocationModal from "../components/LocationModal";

class Post extends Component {
  state = {
    uploading: "",
    post: "",
    location: null,
    imageUrl: null,
    showModal: false,
    postRef: firebase.firestore().collection("posts"),
  };

  uriToBlob = () => {
    const uri = this.props.route.params.imageUri;
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

    this.setState({ imageUrl: null });
    this.setState({
      imageUrl: downloadUrl,
    });
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

  postHandler = (input) => {
    this.setState({ post: input });
  };

  setLocation = (location) => {
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
      },
    };

    this.setState({ location: place, showModal: false });
  };

  submitPost = async () => {
    this.setState({ uploading: true });
    await this.upload();
    const { uid, photoURL, displayName } = this.props.auth;
    const post = {
      location: this.state.location,
      postPhoto: this.state.imageUrl,
      postDescription: this.state.post,
      uid: uid,
      photo: photoURL,
      username: displayName,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const ref = await this.state.postRef.doc();
    post.id = ref.id;
    ref.set(post);
    this.setState({ uploading: false });
    this.clearFields();
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "Camera" }],
    });
    this.props.navigation.navigate("Home");
  };

  clearFields = () => {
    this.setState({
      uploading: "",
      post: "",
      location: null,
      imageUrl: null,
      showModal: false,
    });
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <LocationModal
          selectLocation={this.setLocation}
          isVisible={this.state.showModal}
        />
        {this.state.uploading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        <View style={postStyles.container}>
          <Image
            style={postStyles.image}
            source={{
              uri: this.props.route.params.imageUri,
            }}
          />
          <TextInput
            placeholder="Description"
            style={postStyles.input}
            onChangeText={this.postHandler}
          />
          <TouchableOpacity
            style={postStyles.location}
            onPress={() => this.setState({ showModal: true })}
          >
            <Text style={{ color: "grey", fontSize: 17 }}>
              {this.state.location ? this.state.location.name : "Set Location"}
            </Text>
          </TouchableOpacity>
          <View style={postStyles.wrapper}>
            <TouchableOpacity
              style={postStyles.button}
              onPress={this.submitPost}
            >
              <Text>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
});

export default connect(mapStateToProps)(Post);
