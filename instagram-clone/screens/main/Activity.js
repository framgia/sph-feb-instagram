import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text, FlatList } from "react-native";
import firebase from "../../configs/firebase";
import ActivityItem from "../components/ActivityItem";

class Activity extends Component {
  state = {
    activityRef: firebase.firestore().collection("activities"),
    activities: [],
  };

  componentDidMount() {
    this.getActivities();
  }

  getActivities = () => {
    const activities = [];

    this.state.activityRef
      .where("uid", "==", this.props.user.uid)
      .onSnapshot((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          this.setState({ activities: [...this.state.activities, doc.data()] });
        });
      });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.activities}
          renderItem={({ item }) => <ActivityItem activity={item} />}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.feed,
  user: state.user.auth,
});

export default connect(mapStateToProps)(Activity);
