import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    if (serializedState === null) {
      return { cart: { ids: [], items: [], total: 0 } };
    }
    return { cart: { ids: JSON.parse(serializedState), items: [], total: 0 } };
  } catch (e) {
    console.warn("Failed to load state from localStorage", e);
    return { cart: { ids: [], items: [], total: 0 } };
  }
};

// Save to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart.ids);
    localStorage.setItem("cartItems", serializedState);
  } catch (e) {
    console.warn("Failed to save state to localStorage", e);
  }
};

const initialState = loadFromLocalStorage();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.ids.push(action.payload);
      saveToLocalStorage(state);
    },
    addItemsForCheckout: (state, action) => {
      const finalItems = action.payload.map((item) => ({
        ...item,
        quantity: 1,
        totalPrice: item.price,
      }));
      state.cart.items = finalItems;
      state.cart.total = state.cart.items.reduce(
        (total, { totalPrice }) => total + totalPrice,
        0
      );
    },
    removeFromCartById: (state, action) => {
      const deleteAtIndexInIds = state.cart.ids.indexOf(action.payload.id);
      state.cart.ids.splice(deleteAtIndexInIds, 1);
      saveToLocalStorage(state);
    },
    changeQuantityById: (state, action) => {
      const indexOfMutatingItem = state.cart.items.findIndex(
        ({ id }) => action.payload.id === id
      );
      const itemToMutate = state.cart.items[indexOfMutatingItem];
      state.cart.items[indexOfMutatingItem] = {
        ...itemToMutate,
        quantity: action.payload.quantity,
        totalPrice: itemToMutate.price * action.payload.quantity,
      };
      state.cart.total = state.cart.items.reduce(
        (total, { totalPrice }) => total + totalPrice,
        0
      );
    },
    emptyCart: (state) => {
      state.cart = { ids: [], items: [], total: 0 };
    },
  },
});
export const {
  addToCart,
  addItemsForCheckout,
  removeFromCartById,
  changeQuantityById,
  emptyCart,
} = cartSlice.actions;
export default cartSlice;
