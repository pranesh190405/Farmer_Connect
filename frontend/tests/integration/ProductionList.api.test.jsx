import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/farmer/ProductList";
import api from "../../src/utils/api";

jest.mock("../../src/utils/api", () => ({
  get: jest.fn(),
  delete: jest.fn()
}));

describe("ProductList Integration Test", () => {

  test("fetches and displays products", async () => {

    api.get.mockResolvedValue({
      data: {
        data: [
          {
            _id: "1",
            name: "Tomato",
            description: "Fresh",
            price: 40,
            quantity: 10,
            unit: "kg",
            category: "Vegetables"
          }
        ]
      }
    });

    render(<ProductList />);

    const product = await screen.findByText("Tomato");

    expect(product).toBeInTheDocument();

  });

});