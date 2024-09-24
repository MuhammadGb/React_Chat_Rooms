import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxAvatar } from "react-icons/rx";

export default function MessageList({ roomId }) {
  const containerRef = React.useRef(null);
  const [roomMessages, setRoomMessages] = React.useState([]);
  const user = useSelector((state) => state.user);
  const messages = useSelector((state) => state.messages);

  const prev_Messages = JSON.parse(localStorage.getItem("messages"));

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  useEffect(() => {
    let filteredMsgsByRoom;
    if (messages.length) {
      filteredMsgsByRoom = messages?.filter((msg) => msg.roomId === roomId);
      setRoomMessages(filteredMsgsByRoom);
    } else {
      filteredMsgsByRoom = prev_Messages?.filter(
        (msg) => msg.roomId === roomId
      );
      setRoomMessages(filteredMsgsByRoom);
    }
  }, [messages]);

  return (
    <div
      className="message-list-container"
      ref={containerRef}
      style={{
        overflow: "hidden",
      }}
    >
      <ul className="message-list">
        {!!roomMessages?.length &&
          roomMessages.map((msg) => {
            const isOwnMessage = msg?.user?.id === user?.id;
            return (
              <div
                key={msg.id}
                className={["message", isOwnMessage && "own-message"].join(" ")}
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* <p className="sender">
                  {isOwnMessage ? "You" : msg?.user?.name}
                </p> */}
                {!isOwnMessage && <RxAvatar size={36} />}

                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    letterSpacing: "0.08rem",
                    background: isOwnMessage ? "lightgreen" : "lightgray",
                    padding: "0rem 0.8rem",
                    margin: "0rem 0.5rem",
                    borderRadius: `${isOwnMessage ? "0.7rem" : "0rem"} ${
                      isOwnMessage ? "0rem" : "0.7rem"
                    } 0.7rem 0.7rem`,
                  }}
                >
                  {msg?.content}
                </div>
              </div>
            );
          })}
      </ul>
    </div>
  );
}
