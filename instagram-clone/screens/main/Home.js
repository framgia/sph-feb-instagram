import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import firebase from "../../configs/firebase";

class Home extends Component {
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {});
  };
  render() {
    return (
      <View>
        <Text>test</Text>
        <Button title="Logout" onPress={this.logout} />
      </View>
    );
  }
}

export default Home;
