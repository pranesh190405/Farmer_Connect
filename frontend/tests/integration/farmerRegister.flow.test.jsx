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

describe("Farmer Register Flow Integration Test", () => {

  const store = configureStore({
    reducer: {
      auth: authReducer
    }
  });

  test("user can enter mobile number", async () => {

    render(
      <Provider store={store}>
        <FarmerRegisterPage />
      </Provider>
    );

    const mobileInput = await screen.findByPlaceholderText("auth.farmer.mobilePlaceholder");

    await userEvent.type(mobileInput, "9876543210");

    expect(mobileInput.value).toBe("9876543210");

  });

});