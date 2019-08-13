import {
  GET_CURRENT_CUSTOMER,
  LOAD_CUSTOMERS,
  SET_NULL_CURRENT_CUSTOMER,
} from '../actions/customers';

const initialState = {
  currentCustomer: null,
  customerList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CUSTOMERS:
      return {...state, customerList: action.payload};
    case SET_NULL_CURRENT_CUSTOMER:
      return {...state, currentCustomer: null};
    case GET_CURRENT_CUSTOMER:
      return {...state, currentCustomer: action.payload};
    default:
      return state;
  }
};
