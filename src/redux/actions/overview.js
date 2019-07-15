export const GET_STATS = 'GET_STATS';

export const GET_TODAY_PICKUPS = 'GET_TODAY_PICKUPS';

export const getTodayPickups = payload => ({
    type: GET_TODAY_PICKUPS,
    payload
});

export const getStats = payload => ({
    type: GET_STATS,
    payload
});