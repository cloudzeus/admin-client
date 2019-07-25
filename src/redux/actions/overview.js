export const GET_STATS = 'GET_STATS';

export const GET_TODAY_PICKUPS = 'GET_TODAY_PICKUPS';

export const GET_CURRENT_BOOKING = 'GET_CURRENT_BOOKING';

export const SET_NULL_CURRENT_BOOKING = 'SET_NULL_CURRENT_BOOKING';

export const setNullCurrentBooking = () => ({
    type: SET_NULL_CURRENT_BOOKING,
    payload : null
});

export const setCurrentBooking = payload => ({
    type: GET_CURRENT_BOOKING,
    payload
});

export const getTodayPickups = payload => ({
    type: GET_TODAY_PICKUPS,
    payload
});

export const getStats = payload => ({
    type: GET_STATS,
    payload
});