import React from "react";
import { connect } from "react-redux";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import styles from "../styles/style";
import homeStyles from "../styles/home";
import { setFeed } from "../../actions";
import firebase from "../../configs/firebase";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postRef: firebase.firestore().collection("posts"),
      activityRef: firebase.firestore().collection("activities"),
      isLikeToggled: false,
      toggledId: null,
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
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => data.push(doc.data()));
        this.props.dispatch(setFeed(data));
      });
  };

  toggleLike = (item) => {
    const { uid } = this.props.user;

    item.likes.includes(uid) ? this.unlikePost(item) : this.likePost(item);
  };

  likePost = async (item) => {
    const { photoURL, displayName, uid } = this.props.user;

    this.setState({ isLikeToggled: true, toggledId: item.id });

    await this.state.postRef.doc(item.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(uid),
    });

    this.setState({ isLikeToggled: false });

    this.state.activityRef.doc().set({
      postId: item.id,
      postPhoto: item.postPhoto,
      likerId: uid,
      likerPhoto: photoURL,
      likerName: displayName,
      uid: item.uid,
      date: new Date().getTime(),
      type: "Like",
    });
  };

  unlikePost = async (item) => {
    const { photoURL, displayName, uid } = this.props.user;

    await this.state.postRef.doc(item.id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(uid),
    });

    const query = await this.state.activityRef
      .where("postId", "==", item.id)
      .where("likerId", "==", uid)
      .get();

    query.forEach((response) => {
      response.ref.delete();
    });
  };

  render() {
    console.log(this.state.isLikeToggled);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <FlatList
          data={this.props.posts}
          style={homeStyles.cardWrapper}
          renderItem={({ item }) => {
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
                  <TouchableOpacity onPress={() => this.toggleLike(item)}>
                    <ImageBackground
                      source={{ uri: item.postPhoto }}
                      style={homeStyles.postImage}
                    >
                      {this.state.isLikeToggled &&
                      this.state.toggledId === item.id ? (
                        <Ionicons name="ios-heart" size={100} color="red" />
                      ) : null}
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                <View style={homeStyles.cardFooter}>
                  <View style={homeStyles.footerActions}>
                    <View style={homeStyles.actionRight}>
                      <Ionicons
                        name={
                          item.likes.includes(this.props.user.uid)
                            ? "ios-heart"
                            : "ios-heart-empty"
                        }
                        size={30}
                        color={
                          item.likes.includes(this.props.user.uid)
                            ? "red"
                            : "black"
                        }
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
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Map", {
                        location: item.location,
                      })
                    }
                  >
                    <Text>{item.location ? item.location.name : ""}</Text>
                  </TouchableOpacity>
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
  user: state.user.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
