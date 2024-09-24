import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Room from "./Room";
import MessageList from "./MessageList";
import MessageField from "./MessageField";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

jest.mock("./MessageList", () => jest.fn());
jest.mock("./MessageField", () => jest.fn());

describe("Room component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useParams.mockReturnValue({ id: 1 });
  });

  test("renders the room title", () => {
    const room = { id: 1, title: "Test Room" };
    render(<Room />);
    const titleElement = screen.getByText(room.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the back link", () => {
    render(<Room />);
    const linkElement = screen.getByText("⬅️ Back to all rooms");
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the MessageList component", () => {
    render(<Room />);
    expect(MessageList).toHaveBeenCalledWith({ roomId: 1 }, {});
  });

  test("renders the MessageField component", () => {
    render(<Room />);
    expect(MessageField).toHaveBeenCalledWith({ roomId: 1 }, {});
  });
});
