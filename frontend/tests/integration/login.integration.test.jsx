import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/store/slices/authSlice";
import LoginPage from "../../src/app/(auth)/login/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn(() => null) })
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

describe("Login Integration Test", () => {

  const store = configureStore({
    reducer: {
      auth: authReducer
    }
  });

  test("user can enter mobile", async () => {

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    // wait until mobile input appears
    const mobileInput = await screen.findByRole("textbox");

    await userEvent.type(mobileInput, "9876543210");

    expect(mobileInput.value).toBe("9876543210");

  });

});