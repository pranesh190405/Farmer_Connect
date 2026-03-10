import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../../src/components/farmer/ProductList";
import api from "../../src/utils/api";

jest.mock("../../src/utils/api");

describe("ProductList Component Test", () => {

  test("shows loading message initially", async () => {
    api.get.mockResolvedValue({
      data: { data: [] }
    });

    render(<ProductList />);

    // loading appears first
    expect(screen.getByText("Loading products...")).toBeInTheDocument();

    // wait until loading disappears after state update
    await waitFor(() =>
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument()
    );
  });

  test("shows empty state when no products exist", async () => {
    api.get.mockResolvedValue({
      data: { data: [] }
    });

    render(<ProductList />);

    expect(await screen.findByText("No products listed yet.")).toBeInTheDocument();
  });

  test("renders product list when products exist", async () => {
    api.get.mockResolvedValue({
      data: {
        data: [
          {
            _id: "1",
            name: "Tomato",
            category: "Vegetables",
            description: "Fresh tomatoes",
            price: 25,
            quantity: 100,
            unit: "kg"
          }
        ]
      }
    });

    render(<ProductList />);

    expect(await screen.findByText("Tomato")).toBeInTheDocument();
    expect(screen.getByText("Fresh tomatoes")).toBeInTheDocument();
  });

});