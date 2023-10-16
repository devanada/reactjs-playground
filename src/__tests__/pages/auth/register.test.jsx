import "@testing-library/jest-dom";

import { render, screen, within, fireEvent, act } from "@/__tests__/test-utils";

import App from "@/pages/auth/register";

describe("Register Page", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  describe("Renders the page", () => {
    it("should render the page", () => {
      const form = screen.getByLabelText("form-register");
      expect(form).toBeTruthy();

      expect(within(form).getByLabelText("input-username")).toBeTruthy();
      expect(within(form).getByLabelText("input-password")).toBeTruthy();
      expect(within(form).getByLabelText("input-repassword")).toBeTruthy();
      expect(within(form).getByLabelText("btn-submit")).toBeTruthy();
    });

    it("should displays value inside input", () => {
      const form = screen.getByLabelText("form-register");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");
      const repassword = within(form).getByLabelText("input-repassword");

      fireEvent.change(username, {
        target: { value: "Username" },
      });
      fireEvent.change(password, {
        target: { value: "Password123" },
      });
      fireEvent.change(repassword, {
        target: { value: "Password123" },
      });

      expect(username).toHaveValue("Username");
      expect(password).toHaveValue("Password123");
      expect(repassword).toHaveValue("Password123");
    });
  });

  describe("Action for Register", () => {
    it("should show error message when some of input is missing a value", async () => {
      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });
      const form = screen.getByLabelText("form-register");

      expect(within(form).getByText("Username is required")).toBeTruthy();
      expect(within(form).getByText("Password is required")).toBeTruthy();
      expect(
        within(form).getByText("Retype password is required")
      ).toBeTruthy();
    });

    it("should show error message when password is not match", async () => {
      const form = screen.getByLabelText("form-register");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");
      const repassword = within(form).getByLabelText("input-repassword");

      fireEvent.change(username, {
        target: { value: "admin" },
      });
      fireEvent.change(password, {
        target: { value: "password123" },
      });
      fireEvent.change(repassword, {
        target: { value: "Password123" },
      });

      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });

      expect(within(form).getByText("Passwords don't match")).toBeTruthy();
    });

    it("should display succesful toast when using non-exist username", async () => {
      const form = screen.getByLabelText("form-register");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");
      const repassword = within(form).getByLabelText("input-repassword");

      fireEvent.change(username, {
        target: { value: "admin" },
      });
      fireEvent.change(password, {
        target: { value: "password123" },
      });
      fireEvent.change(repassword, {
        target: { value: "password123" },
      });

      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });

      setTimeout(() => {
        expect(screen.getByText("Register Success")).toBeTruthy();
      }, 2000);
    });

    it("should display failed toast when username already exist", async () => {
      const form = screen.getByLabelText("form-register");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");
      const repassword = within(form).getByLabelText("input-repassword");

      fireEvent.change(username, {
        target: { value: "Admin" },
      });
      fireEvent.change(password, {
        target: { value: "password123" },
      });
      fireEvent.change(repassword, {
        target: { value: "password123" },
      });

      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });

      setTimeout(() => {
        expect(screen.getByText("Username already exist")).toBeTruthy();
      }, 2000);
    });
  });
});
