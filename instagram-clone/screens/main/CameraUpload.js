import React from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { View, Text, TouchableOpacity, Image } from "react-native";

class CameraUpload extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
  };

  componentDidMount() {
    this.cameraPermission();
  }

  cameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();

    this.setState({ hasPermission: status });
  };

  capture = async () => {
    const image = await this.camera.takePictureAsync();

    if (!image.cancelled) {
      this.resize(image.uri);
    }
  };

  cameraFlip = () => {
    const type =
      this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back;

    this.setState({ type });
  };

  setIcon = () => {
    const { type } = this.state;

    if (type === Camera.Constants.Type.front) {
      return <Ionicons name="ios-camera" size={40} color="white" />;
    } else {
      return <Ionicons name="ios-reverse-camera" size={40} color="white" />;
    }
  };

  openLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.resize(result.uri);
    }
  };

  resize = async (uri) => {
    const resize = await ImageManipulator.manipulateAsync(uri, [], {
      format: "jpeg",
      comporess: 0.1,
    });

    this.setState({
      image: resize,
    });
  };

  render() {
    const { hasPermission, type, image } = this.state;

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if (image) {
      return (
        <View style={{ flex: 1, width: "100%" }}>
          <View
            style={{
              position: "absolute",
              height: 40,
              right: 5,
              top: 10,
              width: 50,
              zIndex: 999,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ image: null });
                this.props.navigation.navigate("Upload", {
                  imageUri: image.uri,
                });
              }}
            >
              <Ionicons name="md-arrow-forward" size={40} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              height: 40,
              left: 20,
              top: 10,
              width: 50,
              zIndex: 999,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ image: null });
              }}
            >
              <Ionicons name="md-close" size={40} color="white" />
            </TouchableOpacity>
          </View>

          <Image source={{ uri: image.uri, height: "100%", width: "100%" }} />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(ref) => (this.camera = ref)}
        >
          <View
            style={{
              height: 40,
              paddingTop: 10,
              paddingLeft: 20,
              width: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Ionicons name="md-close" size={40} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 60,
                  justifyContent: "center",
                }}
                onPress={this.cameraFlip}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    marginLeft: 20,
                  }}
                >
                  {this.setIcon()}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderColor: "white",
                  borderWidth: 4,
                  height: 60,
                  width: 60,
                  borderRadius: 99,
                  marginBottom: 20,
                }}
                onPress={this.capture}
              ></TouchableOpacity>
              <View style={{ width: 60, paddingTop: 15 }}>
                <TouchableOpacity onPress={this.openLibrary}>
                  <Ionicons name="ios-images" size={35} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}

export default CameraUpload;
