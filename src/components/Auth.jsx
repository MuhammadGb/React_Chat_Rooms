import React from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions";

const Auth = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    value && dispatch(createUser({ name: value }));
    //sendMessage(roomId, user, value);
    setValue("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(163, 154, 154, 0.5)",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <p style={{ fontWeight: 600 }}>
          Enter your username to join a chat room!
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
            style={{
              height: "2rem",
              width: "6rem",
              margin: "0 auto",
              fontWeight: 600,
            }}
            onClick={handleSubmit}
            className="login"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
