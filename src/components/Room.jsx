import { Link, useParams } from "react-router-dom";
import { chatRooms } from "../content/rooms";
import MessageField from "./MessageField";
import MessageList from "./MessageList";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMessages } from "../redux/actions";

function Room() {
  const params = useParams();
  const dispatch = useDispatch();

  const room = chatRooms.find((x) => x.id === params.id);
  // if (!room) {
  //   // TODO: 404
  // }

  // useEffect(() => {
  //   const messages = dispatch(getMessages());
  //   // console.log("messages", messages);
  //   // setRoomMessages(messages);
  // }, [dispatch]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "messages") {
        const updatedMessages = JSON.parse(localStorage.getItem("messages"));
        dispatch(updateMessages(updatedMessages));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return (
    <div
      style={{
        paddingTop: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "midnightblue",
            color: "white",
            padding: "1rem 1.5rem",
          }}
        >
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "white",
              margin: "0",
            }}
          >
            {room.title}
          </p>
          <Link
            to="/"
            style={{
              color: "white",
            }}
          >
            ⬅️ Back to all rooms
          </Link>
        </div>
        <div
          className="messages-container"
          style={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <MessageList roomId={room.id} />
          <MessageField roomId={room.id} />
        </div>
      </div>
    </div>
  );
}

export default Room;
