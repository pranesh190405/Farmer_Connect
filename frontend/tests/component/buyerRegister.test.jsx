import { render, screen } from "@testing-library/react";
import BuyerRegisterPage from "@/app/(auth)/buyer/register/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({
    isLoading: false,
    isAuthenticated: false,
    user: null,
    error: null,
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("Buyer Register Page Test", () => {
  test("renders buyer registration page", () => {
    render(<BuyerRegisterPage />);

    expect(screen.getByText("auth.buyer.title")).toBeInTheDocument();
  });
});