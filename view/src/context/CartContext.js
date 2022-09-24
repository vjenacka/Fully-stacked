import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        cart: action.payload,
      };
    case "ADD_CART_ITEM":
      return {
        cart: [...state, action.payload],
      };
    case "REMOVE_CART_ITEM":
      return {
        cart: state.cart.filter(ele => ele.product_id !== action.payload),
      };
    case "ADD_ONE":
      return {
        cart: state.cart.map(ele => {
          if (ele.product_id === action.payload) {
            ele.count++;
          }
          return ele;
        }),
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
  });

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
