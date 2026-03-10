import { render, screen } from "@testing-library/react";
import FarmerRegisterPage from "@/app/(auth)/farmer/register/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({
    isLoading: false,
    error: null,
    isAuthenticated: false,
    user: null,
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("Farmer Register Page Test", () => {
  test("renders farmer register page", () => {
    render(<FarmerRegisterPage />);

    expect(screen.getByText("auth.farmer.title")).toBeInTheDocument();
  });
});