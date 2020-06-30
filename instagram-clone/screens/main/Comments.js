import React, { Component } from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

import { findPost, addComment } from "../../actions";
import firebase from "../../configs/firebase";

class Comments extends Component {
  state = {
    post: null,
    comment: "",
    postRef: firebase.firestore().collection("posts"),
  };

  componentDidMount() {
    const postId = this.props.route.params.postId;
    this.props.dispatch(findPost(postId));
  }

  submitComment = () => {
    const postId = this.props.route.params.postId;
    const { uid, username, photo } = this.props.user;

    const newComment = {
      id: firebase.firestore.FieldValue.serverTimestamp() / 4,
      uid,
      username,
      photo,
      content: this.state.comment,
      reply: [],
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.state.postRef
      .doc(postId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(newComment),
      })
      .then(() => {
        this.props.dispatch(addComment(newComment));
      });
  };

  comment = (comment) => {
    return (
      <View
        style={{ marginTop: 20, paddingHorizontal: 20, flexDirection: "row" }}
      >
        <Image
          source={{
            uri: comment.photo,
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 60,
          }}
        />
        <View style={{ flex: 1, paddingLeft: 20 }}>
          <View>
            <Text>{comment.username}</Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text>{comment.content}</Text>
          </View>
          <View>
            <Text>Actions</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={commentStyles.container}>
        <View style={commentStyles.comments}>
          {this.props.post && this.props.post.comments && (
            <FlatList
              data={this.props.post.comments}
              renderItem={({ item }) => this.comment(item)}
            />
          )}
        </View>
        <View style={commentStyles.form}>
          <TextInput
            placeholder="Enter comment..."
            value={this.state.comment}
            multiline={true}
            numberOfLines={10}
            onChangeText={(input) => this.setState({ comment: input })}
            style={commentStyles.input}
          />
          <TouchableOpacity
            style={commentStyles.submit}
            onPress={this.submitComment}
          >
            <Ionicons
              name="md-arrow-forward"
              size={30}
              style={{ fontWeight: "bold" }}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const commentStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    height: "100%",
    fontSize: 15,
    flex: 1,
    paddingLeft: 10,
  },

  submit: {
    width: 65,
    backgroundColor: "#b30095",
    justifyContent: "center",
    alignItems: "center",
  },

  comments: {
    flex: 1,
  },

  form: {
    flexDirection: "row",
    height: 65,
    backgroundColor: "white",
    elevation: 3,
  },
});

const mapStateToProps = (state) => ({
  post: state.posts.activePost,
  user: state.user.auth,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
