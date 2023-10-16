import "@testing-library/jest-dom";

import { render, screen, within, fireEvent, act } from "@/__tests__/test-utils";

import App from "@/pages/auth/login";

describe("Login Page", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  describe("Renders the page", () => {
    it("should render the page", () => {
      const form = screen.getByLabelText("form-login");
      expect(form).toBeTruthy();

      expect(within(form).getByLabelText("input-username")).toBeTruthy();
      expect(within(form).getByLabelText("input-password")).toBeTruthy();
      expect(within(form).getByLabelText("btn-submit")).toBeTruthy();
    });

    it("should displays value inside input", () => {
      const form = screen.getByLabelText("form-login");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");

      fireEvent.change(username, {
        target: { value: "Username" },
      });
      fireEvent.change(password, {
        target: { value: "Password123" },
      });

      expect(username).toHaveValue("Username");
      expect(password).toHaveValue("Password123");
    });
  });

  describe("Action for Login", () => {
    it("should show error message when some of input is missing a value", async () => {
      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });
      const form = screen.getByLabelText("form-login");

      expect(within(form).getByText("Username is required")).toBeTruthy();
      expect(within(form).getByText("Password is required")).toBeTruthy();
    });

    it("should display succesful toast when using correct credential", async () => {
      const form = screen.getByLabelText("form-login");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");

      fireEvent.change(username, {
        target: { value: "admin" },
      });
      fireEvent.change(password, {
        target: { value: "password123" },
      });

      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });

      setTimeout(() => {
        expect(screen.getByText("Successfully login")).toBeTruthy();
      }, 2000);
    });

    it("should display failed toast when using incorrect credential (password)", async () => {
      const form = screen.getByLabelText("form-login");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");

      fireEvent.change(username, {
        target: { value: "admin" },
      });
      fireEvent.change(password, {
        target: { value: "Password123" },
      });

      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });

      setTimeout(() => {
        expect(screen.getByText("Invalid password")).toBeTruthy();
      }, 2000);
    });

    it("should display failed toast when using incorrect credential (username)", async () => {
      const form = screen.getByLabelText("form-login");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");

      fireEvent.change(username, {
        target: { value: "Admin" },
      });
      fireEvent.change(password, {
        target: { value: "password123" },
      });

      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });

      setTimeout(() => {
        expect(screen.getByText("Invalid username")).toBeTruthy();
      }, 2000);
    });

    it("should display failed toast when using incorrect credential (username & password)", async () => {
      const form = screen.getByLabelText("form-login");
      const username = within(form).getByLabelText("input-username");
      const password = within(form).getByLabelText("input-password");

      fireEvent.change(username, {
        target: { value: "Admin" },
      });
      fireEvent.change(password, {
        target: { value: "Password123" },
      });

      await act(async () => {
        fireEvent.click(screen.getByLabelText("btn-submit"));
      });

      setTimeout(() => {
        expect(screen.getByText("Invalid username or password")).toBeTruthy();
      }, 2000);
    });
  });
});
