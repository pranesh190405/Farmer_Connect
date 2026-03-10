import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FarmerRegisterPage from "../../src/app/(auth)/farmer/register/page";
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

describe("Farmer Register Validation Test", () => {

  const store = configureStore({
    reducer: { auth: authReducer }
  });

  test("invalid mobile input", async () => {

    render(
      <Provider store={store}>
        <FarmerRegisterPage />
      </Provider>
    );

    const mobileInput = screen.getByPlaceholderText("auth.farmer.mobilePlaceholder");

    await userEvent.type(mobileInput, "12");

    expect(mobileInput.value).toBe("12");

  });

});