import React from "react";
import { connect } from "react-redux";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { View, Text, StatusBar, FlatList, Image } from "react-native";

import styles from "../styles/style";
import homeStyles from "../styles/home";
import { setFeed } from "../../actions";
import firebase from "../../configs/firebase";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postRef: firebase.firestore().collection("posts"),
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.fetchPosts();
    });
  }

  fetchPosts = () => {
    this.state.postRef
      .orderBy("created", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.props.dispatch(setFeed(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <FlatList
          data={this.props.posts}
          style={homeStyles.cardWrapper}
          renderItem={({ item }) => {
            console.log(item.postPhoto);
            return (
              <View style={homeStyles.card}>
                <View style={homeStyles.cardHeader}>
                  <View style={homeStyles.headerData}>
                    <Image
                      style={homeStyles.avatar}
                      source={{ uri: item.photo }}
                    />
                    <Text style={homeStyles.userName}>{item.username}</Text>
                  </View>
                  <View style={homeStyles.headerAction}>
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color="black"
                    />
                  </View>
                </View>
                <View style={homeStyles.cardImage}>
                  <Image
                    source={{ uri: item.postPhoto }}
                    style={homeStyles.image}
                  />
                </View>
                <View style={homeStyles.cardFooter}>
                  <View style={homeStyles.footerActions}>
                    <View style={homeStyles.actionRight}>
                      <Ionicons
                        name="ios-heart-empty"
                        size={30}
                        color="black"
                      />
                      <MaterialCommunityIcons
                        name="chat-outline"
                        size={30}
                        color="black"
                      />
                      <SimpleLineIcons
                        name="paper-plane"
                        size={30}
                        color="black"
                      />
                    </View>
                    <View style={homeStyles.bookmark}>
                      <MaterialCommunityIcons
                        name="bookmark-outline"
                        size={30}
                        color="black"
                      />
                    </View>
                  </View>
                  <Text>{item.postDescription}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  posts: state.posts.feed,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
