import React, { Component } from "react";
import * as Facebook from "expo-facebook";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Image,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import firebase from "../../configs/firebase";
import styles from "../styles/style";
import authStyles from "../styles/auth";

class Login extends Component {
  state = {
    userRef: firebase.firestore().collection("users"),
    email: "",
    password: "",
    isLoading: false,
  };

  handleEmail = (input) => {
    this.setState({ email: input });
  };

  handlePassword = (input) => {
    this.setState({ password: input });
  };

  handleSubmit = () => {
    Keyboard.dismiss();
    this.setState({ isLoading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  facebookLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync("550263242330720", {
        permissions: ["public_profile"],
      });

      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        const response = await firebase
          .auth()
          .signInWithCredential(credential)
          .catch((err) => {
            console.log(err);
          });
        console.log(response.user);
        const user = await this.state.userRef.doc(response.user.uid).get();

        if (!user.exists) {
          this.saveUser(response.user);
        }
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  saveUser = (user) => {
    this.state.userRef.doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      bio: "",
      photo: user.photoURL,
      token: null,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ? (
          <View style={authStyles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}

        <View style={authStyles.formContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ height: 150, width: 150 }}
          />
          <Text style={authStyles.title}>Instashot</Text>
          <TextInput
            style={authStyles.inputs}
            value={this.state.email}
            onChangeText={this.handleEmail}
            placeholder="email"
          />
          <TextInput
            style={authStyles.inputs}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this.handlePassword}
            placeholder="password"
          />

          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={authStyles.submit}
              onPress={this.handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Text style={{ color: "#b0b0b0" }}>Forgot password ? </Text>
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => console.log("test")}
            >
              Get Help.
            </Text>
          </View>

          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={authStyles.submit}
              onPress={this.facebookLogIn}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                Login with facebook
              </Text>
            </TouchableOpacity>
          </View>

          <View style={authStyles.dividerText}>
            <View style={authStyles.dividerLine}></View>
            <Text style={{ marginHorizontal: 5 }}>OR</Text>
            <View style={authStyles.dividerLine}></View>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Text style={{ color: "#b0b0b0" }}>Don't have an account ? </Text>
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() =>
                this.props.navigation.navigate({
                  name: "Sign Up",
                })
              }
            >
              Sign Up.
            </Text>
          </View>
          <TouchableOpacity />
        </View>
      </SafeAreaView>
    );
  }
}

export default Login;
