import { GET_STATS,GET_TODAY_PICKUPS, GET_CURRENT_BOOKING,SET_NULL_CURRENT_BOOKING  } from '../actions/overview'



const initialState = {
    stats : {
        totalProfit : 459656,
        totalBookings : 67,
        totalCustomers : 34,
        totalDeposit : 785

    },
    todayPickups : null,
    currentBooking : null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_STATS:
            return {...state,stats:action.payload}
        case GET_TODAY_PICKUPS:
            return {...state,todayPickups:action.payload}
        case GET_CURRENT_BOOKING:
            return {...state,currentBooking:action.payload}
        case SET_NULL_CURRENT_BOOKING:
            return {...state,currentBooking:action.payload}            
        default:
            return state;
    }
};