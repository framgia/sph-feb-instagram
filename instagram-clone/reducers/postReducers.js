import { ACTION_TYPES } from "../actions";

const initialState = {
  feed: [],
};

const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FEED:
      return { ...state, feed: action.payload.posts };
    default:
      return state;
  }
};

export default postReducers;
