import React, { Component } from "react";
import MapView from "react-native-maps";

class Map extends Component {
  render() {
    const { location } = this.props.route.params;
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.coords.lat,
          longitude: location.coords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: location.coords.lat,
            longitude: location.coords.lng,
          }}
          title={location.name}
        />
      </MapView>
    );
  }
}

export default Map;
