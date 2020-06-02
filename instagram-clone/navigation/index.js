import React from "react";
import { connect } from "react-redux";
import { StatusBar, View, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import firebase from "../configs/firebase";
import { setAuthUser } from "../actions";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

class AppNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setAuthUser(user);
        this.setState({ isAuth: true });
      } else {
        this.setState({ isAuth: false });
      }
    });
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        {this.state.isAuth && <TabNavigator />}
        {!this.state.isAuth && <AuthNavigator />}
      </NavigationContainer>
    );
  }
}
export default connect(null, { setAuthUser })(AppNavigator);
