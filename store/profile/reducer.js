import { profileActionsTypes } from "./actions";
const intialState = {
  currentChat: null,
};
export const profileReducer = (state = intialState, action) => {
  switch (action.type) {
    case profileActionsTypes.SET_CHAT:
      return { ...state, currentChat: action.payload };
    case profileActionsTypes.ANOTHER_ACTION:
      return { ...state };
    default:
      return state;
  }
};
