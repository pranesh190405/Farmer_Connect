import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart
} from "../../src/store/slices/cartSlice";

describe("cartSlice reducer", () => {

  const product = {
    id: 1,
    name: "Tomato",
    price: 20
  };

  test("should return initial state", () => {
    const state = cartReducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      items: [],
      isOpen: false
    });
  });

  test("should add item to cart", () => {
    const state = cartReducer(undefined, addToCart(product));

    expect(state.items.length).toBe(1);
    expect(state.items[0].name).toBe("Tomato");
  });

  test("should increase quantity if item exists", () => {
    const startState = {
      items: [{ ...product, quantity: 1 }],
      isOpen: false
    };

    const state = cartReducer(startState, addToCart(product));

    expect(state.items[0].quantity).toBe(2);
  });

  test("should remove item from cart", () => {
    const startState = {
      items: [{ ...product, quantity: 1 }],
      isOpen: false
    };

    const state = cartReducer(startState, removeFromCart(1));

    expect(state.items.length).toBe(0);
  });

  test("should update quantity", () => {
    const startState = {
      items: [{ ...product, quantity: 1 }],
      isOpen: false
    };

    const state = cartReducer(startState, updateQuantity({ id: 1, quantity: 5 }));

    expect(state.items[0].quantity).toBe(5);
  });

  test("should clear cart", () => {
    const startState = {
      items: [{ ...product, quantity: 1 }],
      isOpen: false
    };

    const state = cartReducer(startState, clearCart());

    expect(state.items.length).toBe(0);
  });

  test("should toggle cart", () => {
    const state = cartReducer(undefined, toggleCart());

    expect(state.isOpen).toBe(true);
  });

  test("should open cart", () => {
    const state = cartReducer(undefined, openCart());

    expect(state.isOpen).toBe(true);
  });

  test("should close cart", () => {
    const startState = {
      items: [],
      isOpen: true
    };

    const state = cartReducer(startState, closeCart());

    expect(state.isOpen).toBe(false);
  });

});