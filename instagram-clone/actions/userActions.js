import { ACTION_TYPES } from "./index";

export const setAuthUser = (user) => {
  return {
    type: ACTION_TYPES.SET_AUTH_USER,
    payload: {
      user: user,
    },
  };
};
