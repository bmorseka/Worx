import axios from 'axios';

const ADD_PRODUCT = 'ADD_PRODUCT';
const SEND_ORDER = 'SEND_ORDER';
const DELETE_ITEM = 'DELETE_ITEM';

const _sendOrder = (payload) => ({
  type: SEND_ORDER,
  payload,
});

export const sendOrder = (cartItems, cartTotal) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/orders`, cartItems, cartTotal);
      //what data is being returned here? Just this cart?
      dispatch(_sendOrder(data));
    } catch (err) {
      console.error('Unable to send order...', err);
    }
  };
};

const initialState = {
  cartItems: [],
  cartTotal: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      // Add item to cartItems array
      const newItems = [...state.cartItems, action.payload];
      // Update cartTotal amount
      const newTotal = state.cartTotal + +action.payload.price;
      return {
        cartItems: newItems,
        cartTotal: newTotal,
      };
    case DELETE_ITEM:
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        cartItems: [filteredItems],
        cartTotal: state.cartTotal,
      };
    case SEND_ORDER:
    //payload coming in for sendorder are the cartitems that were just posted as a cart to backend
    //do we want to just return
    default:
      return state;
  }
}
