import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../../src/app/(auth)/login/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/store/slices/authSlice";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({
    get: () => "farmer"
  })
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

describe("Login Validation Test", () => {

  const store = configureStore({
    reducer: { auth: authReducer }
  });

  test("user enters invalid mobile", async () => {

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const mobileInput = screen.getByPlaceholderText("auth.login.mobilePlaceholder");

    await userEvent.type(mobileInput, "123");

    expect(mobileInput.value).toBe("123");

  });

});