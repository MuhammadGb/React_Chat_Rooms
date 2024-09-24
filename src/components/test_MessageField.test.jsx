import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../actions/messageActions";
import MessageField from "./MessageField";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../actions/messageActions", () => ({
  createMessage: jest.fn(),
}));

describe("MessageField component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({ user: "testUser" });
  });

  test("renders the input field", () => {
    render(<MessageField roomId={1} />);
    const inputElement = screen.getByPlaceholderText("Enter a message");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates the input value on change", () => {
    render(<MessageField roomId={1} />);
    const inputElement = screen.getByPlaceholderText("Enter a message");
    fireEvent.change(inputElement, { target: { value: "Test message" } });
    expect(inputElement.value).toBe("Test message");
  });

  test("dispatches createMessage action on form submit", () => {
    render(<MessageField roomId={1} />);
    const inputElement = screen.getByPlaceholderText("Enter a message");
    const submitButton = screen.getByText("Send");
    fireEvent.change(inputElement, { target: { value: "Test message" } });
    fireEvent.click(submitButton);
    expect(createMessage).toHaveBeenCalledWith({
      content: "Test message",
      roomId: 1,
      user: "testUser",
    });
  });

  test("resets the input value on form submit", () => {
    render(<MessageField roomId={1} />);
    const inputElement = screen.getByPlaceholderText("Enter a message");
    const submitButton = screen.getByText("Send");
    fireEvent.change(inputElement, { target: { value: "Test message" } });
    fireEvent.click(submitButton);
    expect(inputElement.value).toBe("");
  });
});
