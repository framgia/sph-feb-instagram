import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  Image,
  Keyboard,
} from "react-native";

import styles from "../styles/style";
import authStyles from "../styles/auth";
import firebase from "../../configs/firebase";

class SignUp extends Component {
  state = {
    userRef: firebase.firestore().collection("users"),
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    isLoading: false,
  };

  handleEmail = (input) => {
    this.setState({ email: input });
  };

  handlePassword = (input) => {
    this.setState({ password: input });
  };

  passwordConfirm = (input) => {
    this.setState({ password_confirmation: input });
  };

  handleName = (input) => {
    this.setState({ name: input });
  };

  handleSubmit = () => {
    Keyboard.dismiss();
    this.setState({ isLoading: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(({ user }) => {
        this.saveUser(user);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  saveUser = (user) => {
    this.state.userRef.doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      username: this.state.name,
      bio: "",
      photo: "",
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
          <Text style={{ ...authStyles.title, fontSize: 60 }}>Sign up</Text>
          <TextInput
            style={authStyles.inputs}
            value={this.state.email}
            onChangeText={this.handleEmail}
            placeholder="email"
          />
          <TextInput
            style={authStyles.inputs}
            value={this.state.name}
            onChangeText={this.handleName}
            placeholder="name"
          />
          <TextInput
            style={authStyles.inputs}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this.handlePassword}
            placeholder="password"
          />
          <TextInput
            style={authStyles.inputs}
            secureTextEntry={true}
            value={this.state.password_confirmation}
            onChangeText={this.passwordConfirm}
            placeholder="Confirm Password"
          />
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={authStyles.submit}
              onPress={this.handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 15 }}>
            <Text style={{ color: "#b0b0b0" }}>Don't have an account ? </Text>
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() =>
                this.props.navigation.navigate({
                  name: "Login",
                })
              }
            >
              Log In.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SignUp;
