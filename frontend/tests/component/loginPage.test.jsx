import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import LoginPage from "@/app/(auth)/login/page";

// Mock Next navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: () => "farmer",
    };
  },
}));

// Mock i18n
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("Login Page Component Test", () => {

  test("renders login page", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const title = screen.getByText("auth.login.welcome");
    expect(title).toBeInTheDocument();
  });

  test("shows validation error for invalid mobile number", async () => {

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const mobileInput = screen.getByPlaceholderText("auth.login.mobilePlaceholder");
    const pinInput = screen.getByPlaceholderText("auth.login.pinPlaceholder");
    const loginButton = screen.getByText("auth.login.loginButton");

    await userEvent.type(mobileInput, "123");
    await userEvent.type(pinInput, "1234");

    await userEvent.click(loginButton);

    expect(mobileInput.value).toBe("123");
  });

  test("shows validation error for invalid PIN", async () => {

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const mobileInput = screen.getByPlaceholderText("auth.login.mobilePlaceholder");
    const pinInput = screen.getByPlaceholderText("auth.login.pinPlaceholder");
    const loginButton = screen.getByText("auth.login.loginButton");

    await userEvent.type(mobileInput, "9876543210");
    await userEvent.type(pinInput, "12");

    await userEvent.click(loginButton);

    expect(pinInput.value).toBe("12");
  });

  test("accepts valid mobile and PIN input", async () => {

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const mobileInput = screen.getByPlaceholderText("auth.login.mobilePlaceholder");
    const pinInput = screen.getByPlaceholderText("auth.login.pinPlaceholder");

    await userEvent.type(mobileInput, "9876543210");
    await userEvent.type(pinInput, "1234");

    expect(mobileInput.value).toBe("9876543210");
    expect(pinInput.value).toBe("1234");
  });

});