import { ACTION_TYPES } from "../actions";

const initialState = {
  feed: [],
  activePost: null,
};

const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FEED:
      return { ...state, feed: action.payload.posts };
    case ACTION_TYPES.FIND_POST:
      const post = state.feed.filter(
        (post) => post.id === action.payload.postId
      )[0];
      return { ...state, activePost: post };

    case ACTION_TYPES.ADD_COMMENT:
      const feed = { ...state.feed };

      feed.map((post) => {
        if (post.id === action.payload.postId) {
          post.comments.push(action.payloads.comment);
        }
      });

      return { ...state, feed };
    default:
      return state;
  }
};

export default postReducers;
