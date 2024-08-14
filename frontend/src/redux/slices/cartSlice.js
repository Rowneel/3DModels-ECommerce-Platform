import { createSlice } from "@reduxjs/toolkit";
import cartAPI from "../../mocks/cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      console.log(state.cartItems)

      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
    removeCartItem(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
});

export const {
  setCartItems,
  removeCartItem,
  setPaymentMethod,
} = cartSlice.actions;

export const addToCart = (id) => async (dispatch, getState) => {
  try {
    const { cartItems } = getState().cart;
    const product = await cartAPI.fetchProduct(id);

    let existingItemIndex = -1;
    console.log(cartItems.length)
    for (let i = 0; i < cartItems.length; i++) {
      console.log(cartItems[i]._id,id)
      if (cartItems[i]._id == id) {
        existingItemIndex = i;
        break;
      }
    }
    console.log(existingItemIndex)
    if (existingItemIndex !== -1) {
      // If an item with the same product ID exists, update its quantity
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      dispatch(setCartItems([...cartItems, { ...product}]));
    }
  } catch (error) {
    console.log("Error adding item to cart:", error);
  }
};

export const removeFromCart = (id) => (dispatch) => {
  try {
    dispatch(removeCartItem(id));
  } catch (error) {
    console.log("Error removing item from cart:", error);
  }
};


export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(setPaymentMethod(data));
};

export const { reducer } = cartSlice;
export default cartSlice;