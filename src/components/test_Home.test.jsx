import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

const chatRooms = [
  { id: 1, title: "Room 1" },
  { id: 2, title: "Room 2" },
  { id: 3, title: "Room 3" },
];

describe("Home component", () => {
  test("renders the select a chat room heading", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const headingElement = screen.getByText("Select a Chat Room");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the chat room list", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const chatRoomListElement = screen.getByRole("list", {
      name: "Chat Room List",
    });
    expect(chatRoomListElement).toBeInTheDocument();
  });

  test("renders the chat room links", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    chatRooms.forEach((room) => {
      const linkElement = screen.getByRole("link", { name: room.title });
      expect(linkElement).toBeInTheDocument();
    });
  });
});
