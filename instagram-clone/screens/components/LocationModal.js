import React, { Component } from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import postStyles from "../styles/post";
import { Location, Permissions } from "expo";
import ENV from "../../configs/env";
const GOOGLE_API =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

class LocationModal extends Component {
  state = {
    locations: [],
  };

  componentDidMount() {
    this.getLocations();
  }

  getLocations = async () => {
    // const permession = await Location.requestPermissionsAsync();
    // if (permission === "granted") {
    //   const location = await Location.getCurrentPositionAsync();
    //   const url = `${GOOGLE_API}?location=${location.coords.latitude},
    //                             ${location.coords.longitude},
    //                             rankby=distance&key=${ENV.googleApiKey}`;
    //   const reponse = await fetch(url);
    //   const data = await response.json();
    //   this.setState({ locations: data.results });
    //   console.log(data.results);
    // }
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.isVisible}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity style={{ ...postStyles.location, width: "96%" }}>
              <Text style={{ color: "grey", fontSize: 17 }}> Test </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default LocationModal;
