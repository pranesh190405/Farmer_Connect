import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "../../src/components/farmer/ProductForm";
import api from "../../src/utils/api";

jest.mock("../../src/utils/api", () => ({
  post: jest.fn(),
  put: jest.fn()
}));

describe("ProductForm Integration Test", () => {

  test("submits new product successfully", async () => {

    api.post.mockResolvedValue({
      data: { data: { id: "1" } }
    });

    const mockSuccess = jest.fn();

    render(
      <ProductForm
        onSuccess={mockSuccess}
        onCancel={jest.fn()}
      />
    );

    const nameInput = document.querySelector('input[name="name"]');
    const descriptionInput = document.querySelector('textarea[name="description"]');
    const priceInput = document.querySelector('input[name="price"]');
    const quantityInput = document.querySelector('input[name="quantity"]');

    await userEvent.type(nameInput, "Tomato");
    await userEvent.type(descriptionInput, "Fresh tomatoes");
    await userEvent.type(priceInput, "50");
    await userEvent.type(quantityInput, "10");

    await userEvent.click(screen.getByRole("button", { name: /save product/i }));

    expect(api.post).toHaveBeenCalled();
    expect(mockSuccess).toHaveBeenCalled();

  });

});