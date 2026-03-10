import { render, screen } from "@testing-library/react";
import ForgotPinPage from "@/app/(auth)/forgot-pin/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({
    get: () => "farmer",
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({
    isLoading: false,
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("Forgot PIN Page Test", () => {
  test("renders forgot pin page", () => {
    render(<ForgotPinPage />);

    expect(screen.getByText("auth.forgotPin.title")).toBeInTheDocument();
  });
});