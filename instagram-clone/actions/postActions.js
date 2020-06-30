import { ACTION_TYPES } from "./index";

export const setFeed = (posts) => {
  return {
    type: ACTION_TYPES.SET_FEED,
    payload: {
      posts: posts,
    },
  };
};

export const findPost = (postId) => {
  return {
    type: ACTION_TYPES.FIND_POST,
    payload: {
      postId,
    },
  };
};

export const addComment = (comment, postId) => {
  return {
    type: ACTION_TYPES.ADD_COMMENT,
    payloads: {
      postId,
      comment,
    },
  };
};
