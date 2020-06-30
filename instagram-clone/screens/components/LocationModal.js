import React, { Component } from "react";
import { View, Modal, TouchableOpacity, Text, FlatList } from "react-native";
import postStyles from "../styles/post";
import * as Location from "expo-location";
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
    let { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${ENV.googleApiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ locations: data.results });
    }
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
            <TouchableOpacity
              style={{
                ...postStyles.location,
                width: "100%",
              }}
              onPress={this.props.toggleModal}
            >
              <Text style={{ color: "grey", fontSize: 20 }}>Cancel</Text>
            </TouchableOpacity>
            <FlatList
              keyExtractor={(item) => item.id}
              data={this.state.locations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.selectLocation(item)}
                  style={{
                    ...postStyles.location,
                    width: "100%",
                  }}
                >
                  <Text style={{ color: "grey", fontSize: 17 }}>
                    {" "}
                    {item.name}{" "}
                  </Text>
                  <Text style={{ color: "grey", fontSize: 17 }}>
                    {" "}
                    {item.vicinity}{" "}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default LocationModal;
