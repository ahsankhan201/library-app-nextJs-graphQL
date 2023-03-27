
// // import { render } from '@testing-library/react'

// import LoginPage from './../pages/user/login';
// import { render, screen, fireEvent } from "@testing-library/react";
// // import LoginPage from "@/pages/user/login";

// jest.mock("next/router", () => ({
//   useRouter: () => ({ push: jest.fn() }),
// }));

// describe("LoginPage", () => {
//   it("should render login form", () => {
//     render(<LoginPage />);

//     expect(screen.getByText("Goodreads")).toBeInTheDocument();
//     expect(screen.getByText("Log In")).toBeInTheDocument();
//     expect(screen.getByLabelText("Email")).toBeInTheDocument();
//     expect(screen.getByLabelText("Password")).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
//   });

//   it("should submit login form", async () => {
//     const mockMutate = jest.fn();
//     const mockPush = jest.fn();
//     jest.mock("../../../src/apollo-client", () => ({
//       __esModule: true,
//       default: {
//         mutate: mockMutate.mockResolvedValue({
//           data: {
//             login: {
//               user: { id: "1", name: "John Doe" },
//               token: "jwt-token",
//             },
//           },
//         }),
//       },
//     }));
//     jest.mock("next/router", () => ({
//       useRouter: () => ({ push: mockPush }),
//     }));

//     render(<LoginPage />);
//     const emailInput = screen.getByLabelText("Email");
//     const passwordInput = screen.getByLabelText("Password");
//     const submitButton = screen.getByRole("button", { name: "Log In" });

//     fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });
//     fireEvent.click(submitButton);

//     expect(mockMutate).toHaveBeenCalledWith({
//       mutation: expect.any(Function),
//       variables: { user: { email: "johndoe@example.com", password: "password123" } },
//     });
//     expect(mockPush).toHaveBeenCalledWith("/");
//   });
// });









import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from '../pages/user/login';
import styles from "./../styles/Register.module.css";
import { LOGIN_MUTATION } from "@/services/query/user";

describe("LoginPage", () => {
  it("renders login form", () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log In" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("submits form with valid email and password", async () => {
    jest.mock("../../../src/apollo-client", () => ({
      __esModule: true,
      default: {
        mutate: jest.fn().mockResolvedValue({
          data: {
            login: {
              user: { id: "123", name: "John Doe", email: "john@example.com" },
              token: "xyz123",
            },
          },
        }),
      },
    }));

    render(<LoginPage />)
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log In" });

    // Enter valid email and password and submit the form
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    // Wait for the form to submit and redirect to home page
    const homeLink = await screen.findByRole("link", { name: "" });
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
