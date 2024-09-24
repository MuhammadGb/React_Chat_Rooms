// src/actions.js
export const CREATE_USER = "CREATE_USER";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const UPDATE_MESSAGES = "UPDATE_MESSAGES";

export const createUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const usersLength = users?.length || 0;
  if (users) {
    users.push({ ...user, id: usersLength + 1 });
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    localStorage.setItem("users", JSON.stringify([{ ...user, id: 1 }]));
  }

  return { type: CREATE_USER, payload: { ...user, id: usersLength + 1 } };
};

export const createMessage = (msgObj) => {
  const messages = JSON.parse(localStorage.getItem("messages"));
  const msgLength = messages?.length || 0;

  if (messages && messages.length) {
    messages.push({ ...msgObj, id: msgLength + 1 });
    localStorage.setItem("messages", JSON.stringify(messages));
  } else {
    localStorage.setItem("messages", JSON.stringify([{ ...msgObj, id: 1 }]));
  }
  return { type: CREATE_MESSAGE, payload: messages ?? [{ ...msgObj, id: 1 }] };
};

export const updateMessages = (payload) => {
  const messages = JSON.parse(localStorage.getItem("messages"));
  payload = payload ?? messages;

  return { type: UPDATE_MESSAGES, payload: messages };
};
