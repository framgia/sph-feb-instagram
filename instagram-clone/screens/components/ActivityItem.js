import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from "moment";

export default class ActivityItem extends Component {
  render() {
    const {
      likerName,
      date,
      likerId,
      likerPhoto,
      postPhoto,
    } = this.props.activity;

    return (
      <View style={activityStyles.item}>
        <Image source={{ uri: likerPhoto }} style={activityStyles.userImg} />
        <View style={activityStyles.description}>
          <View style={activityStyles.content}>
            <Text style={activityStyles.boldText}>{likerName}</Text>
            <Text>Liked your photo</Text>
          </View>
          <Text style={activityStyles.boldText}>{moment(date).fromNow()}</Text>
        </View>
        <Image
          source={{ uri: postPhoto }}
          style={{ height: 85, width: 95, marginLeft: 10 }}
        />
      </View>
    );
  }
}

const activityStyles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  userImg: {
    height: 70,
    width: 70,
    borderRadius: 99,
  },
  description: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  content: {
    flexDirection: "row",
  },
  boldText: {
    fontWeight: "bold",
  },
});
