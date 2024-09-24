import React from "react";
import { createMessage } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
//import { useAuth } from "../../hooks/useAuth";
//import { sendMessage } from "../../services/firebase";

function MessageField({ roomId }) {
  //const { user } = useAuth();
  const user = useSelector((state) => state.user);
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    value && dispatch(createMessage({ content: value, roomId, user }));
    //sendMessage(roomId, user, value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
      <input
        type="text"
        placeholder="Enter a message"
        value={value}
        onChange={handleChange}
        className="message-input"
        required
        minLength={1}
      />
      <button
        type="submit"
        disabled={value?.length < 1}
        className="send-message"
      >
        Send
      </button>
    </form>
  );
}
export default MessageField;
