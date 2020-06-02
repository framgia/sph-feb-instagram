import { ACTION_TYPES } from "../actions/index";

const initialState = {
  auth: null,
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_AUTH_USER:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};

export default activityReducer;
