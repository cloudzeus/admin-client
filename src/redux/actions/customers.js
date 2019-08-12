export const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS';

export const GET_CURRENT_CUSTOMER = 'GET_CURRENT_CUSTOMER';

export const SET_NULL_CURRENT_CUSTOMER = 'SET_NULL_CURRENT_CUSTOMER';

export const setNullCurrentCustomer = () => ({
  type: SET_NULL_CURRENT_CUSTOMER,
});

export const setCurrentCustomer = payload => ({
  type: GET_CURRENT_CUSTOMER,
  payload,
});

export const loadCustomers = payload => ({
  type: LOAD_CUSTOMERS,
  payload,
});
