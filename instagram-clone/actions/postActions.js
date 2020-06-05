import { ACTION_TYPES } from "./index";

export const setFeed = (posts) => {
  return {
    type: ACTION_TYPES.SET_FEED,
    payload: {
      posts: posts,
    },
  };
};
