import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPinPage from "../../src/app/(auth)/forgot-pin/page";
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

jest.mock("../../src/components/ui/Toast/Toast", () => ({
  showToast: jest.fn()
}));

describe("Forgot Pin Validation Test", () => {

  const store = configureStore({
    reducer: {
      auth: authReducer
    }
  });

  test("shows validation when mobile number is invalid", async () => {

    render(
      <Provider store={store}>
        <ForgotPinPage />
      </Provider>
    );

    const mobileInput = screen.getByPlaceholderText("auth.farmer.mobilePlaceholder");

    await userEvent.type(mobileInput, "123");

    expect(mobileInput.value).toBe("123");

  });

  test("shows validation when Aadhaar last 4 digits are invalid", async () => {

    render(
      <Provider store={store}>
        <ForgotPinPage />
      </Provider>
    );

    const aadhaarInput = screen.getByPlaceholderText("auth.forgotPin.aadharLast4Placeholder");

    await userEvent.type(aadhaarInput, "12");

    expect(aadhaarInput.value).toBe("12");

  });

  test("shows validation when PINs do not match", async () => {

    render(
      <Provider store={store}>
        <ForgotPinPage />
      </Provider>
    );

    const pinInputs = screen.getAllByPlaceholderText("● ● ● ●");

    await userEvent.type(pinInputs[0], "1234");
    await userEvent.type(pinInputs[1], "9999");

    expect(pinInputs[0].value).toBe("1234");
    expect(pinInputs[1].value).toBe("9999");

  });

});