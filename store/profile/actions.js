export const profileActionsTypes = {
  SET_CHAT: "SET_CHAT",
  ANOTHER_ACTION: "ANOTHER_ACTION",
};

export const profileActions = {
  setCurrentChat: (payload) => ({
    type: profileActionsTypes.SET_CHAT,
    payload,
  }),
  anotherActionCreator: () => ({
    type: profileActionsTypes.ANOTHER_ACTIONs,
  }),
};
