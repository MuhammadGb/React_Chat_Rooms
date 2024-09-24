import React from "react";
import { chatRooms } from "../content/rooms";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        width: "60%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        paddingTop: "5rem",
      }}
    >
      <h2>Select a Chat Room</h2>
      <ul className="chat-room-list">
        {chatRooms.map((room) => (
          <Link to={`/room/${room.id}`} key={room.id}>
            <li style={{ color: "white", fontSize: "2rem" }}>{room.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
