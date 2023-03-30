import { render, fireEvent } from "@testing-library/react";
import NewBook from "../pages/new-book";

describe("NewBook", () => {
  it("should update the book title when input changes", () => {
    const { getByLabelText } = render(<NewBook />);
    const input = getByLabelText("Title:");
    fireEvent.change(input, { target: { value: "Test Book" } });
    expect(input.value).toBe("Test Book");
  });

  it("should update the book author when input changes", () => {
    const { getByLabelText } = render(<NewBook />);
    const input = getByLabelText("Author:");
    fireEvent.change(input, { target: { value: "Test Author" } });
    expect(input.value).toBe("Test Author");
  });

  it("should update the book cover image when input changes", () => {
    const { getByLabelText } = render(<NewBook />);
    const input = getByLabelText("Cover Image:");
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files[0]).toBe(file);
  });

  it("should submit the form when Add Book button is clicked", async () => {
    const { getByLabelText, getByText } = render(<NewBook />);
    const titleInput = getByLabelText("Title:");
    const authorInput = getByLabelText("Author:");
    const coverImageInput = getByLabelText("Cover Image:");
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    fireEvent.change(titleInput, { target: { value: "Test Book" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(coverImageInput, { target: { files: [file] } });
    const submitButton = getByText("Add Book");
    fireEvent.click(submitButton);
    // TODO: Test that the mutation is called with the correct variables
  });
});
