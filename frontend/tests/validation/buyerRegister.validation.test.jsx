import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BuyerRegisterPage from "../../src/app/(auth)/buyer/register/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/store/slices/authSlice";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() })
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

describe("Buyer Register Validation Test", () => {

  const store = configureStore({
    reducer: { auth: authReducer }
  });

  test("invalid mobile number", async () => {

    render(
      <Provider store={store}>
        <BuyerRegisterPage />
      </Provider>
    );

    const mobileInput = screen.getByPlaceholderText("auth.buyer.mobilePlaceholder");

    await userEvent.type(mobileInput, "123");

    expect(mobileInput.value).toBe("123");

  });

});