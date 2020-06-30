import React from "react";
import moment from "moment";
import { View, Text, Image } from "react-native";

import activityStyles from "../styles/Activity";

export default class ActivityItem extends React.Component {
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
          <View>
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
