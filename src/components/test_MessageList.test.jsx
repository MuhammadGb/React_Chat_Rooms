import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import MessageList from "./MessageList";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("MessageList component", () => {
  test("renders messages correctly", () => {
    const roomId = 1;
    const user = { id: 1, name: "John" };
    const messages = [
      { id: 1, roomId: 1, content: "Hello", user: { id: 2, name: "Jane" } },
      { id: 2, roomId: 1, content: "Hi", user: { id: 1, name: "John" } },
    ];

    useSelector.mockReturnValueOnce(user);
    useSelector.mockReturnValueOnce(messages);

    render(<MessageList roomId={roomId} />);

    const messageElements = screen.getAllByTestId("message");
    expect(messageElements).toHaveLength(2);

    const firstMessage = messageElements[0];
    expect(firstMessage).toHaveTextContent("Hello");
    expect(firstMessage).toHaveClass("message");

    const secondMessage = messageElements[1];
    expect(secondMessage).toHaveTextContent("Hi");
    expect(secondMessage).toHaveClass("message own-message");
  });

  test("scrolls to bottom on layout effect", () => {
    const roomId = 1;
    const containerRef = { current: { scrollTop: 0, scrollHeight: 100 } };
    const messages = [
      { id: 1, roomId: 1, content: "Hello", user: { id: 2, name: "Jane" } },
      { id: 2, roomId: 1, content: "Hi", user: { id: 1, name: "John" } },
    ];

    useSelector.mockReturnValueOnce({});
    useSelector.mockReturnValueOnce(messages);

    render(<MessageList roomId={roomId} />);
    expect(containerRef.current.scrollTop).toBe(100);
  });
});
