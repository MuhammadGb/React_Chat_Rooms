import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import Auth from "./Auth";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Auth component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    render(<Auth />);
  });

  test("renders the input field", () => {
    const inputElement = screen.getByPlaceholderText("Enter a message");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates the input value on change", () => {
    const inputElement = screen.getByPlaceholderText("Enter a message");
    fireEvent.change(inputElement, { target: { value: "Test message" } });
    expect(inputElement.value).toBe("Test message");
  });

  test("dispatches createUser action on submit", () => {
    const inputElement = screen.getByPlaceholderText("Enter a message");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(inputElement, { target: { value: "Test message" } });
    fireEvent.click(submitButton);

    expect(useDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Test message" })
    );
  });
});
