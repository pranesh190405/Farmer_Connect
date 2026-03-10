import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "@/components/farmer/ProductForm";

describe("ProductForm Component Test", () => {

  test("renders product form fields", () => {

    const { container } = render(
      <ProductForm onSuccess={jest.fn()} onCancel={jest.fn()} />
    );

    const nameField = container.querySelector('input[name="name"]');
    const categoryField = container.querySelector('select[name="category"]');
    const descriptionField = container.querySelector('textarea[name="description"]');
    const priceField = container.querySelector('input[name="price"]');
    const quantityField = container.querySelector('input[name="quantity"]');

    expect(nameField).toBeInTheDocument();
    expect(categoryField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(priceField).toBeInTheDocument();
    expect(quantityField).toBeInTheDocument();

  });

  test("accepts product input values", async () => {

    const { container } = render(
      <ProductForm onSuccess={jest.fn()} onCancel={jest.fn()} />
    );

    const nameField = container.querySelector('input[name="name"]');
    const descriptionField = container.querySelector('textarea[name="description"]');
    const priceField = container.querySelector('input[name="price"]');
    const quantityField = container.querySelector('input[name="quantity"]');

    await userEvent.type(nameField, "Tomato");
    await userEvent.type(descriptionField, "Fresh farm tomatoes");
    await userEvent.type(priceField, "25");
    await userEvent.type(quantityField, "100");

    expect(nameField.value).toBe("Tomato");
    expect(descriptionField.value).toBe("Fresh farm tomatoes");
    expect(priceField.value).toBe("25");
    expect(quantityField.value).toBe("100");

  });

});