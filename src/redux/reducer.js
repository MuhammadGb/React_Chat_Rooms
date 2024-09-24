// src/reducer.js
import { CREATE_USER, CREATE_MESSAGE, UPDATE_MESSAGES } from "./actions";

const initialState = { user: {}, messages: [] };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, user: action.payload };
    case CREATE_MESSAGE:
      return { ...state, messages: action.payload };

    case UPDATE_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};

export default counterReducer;
