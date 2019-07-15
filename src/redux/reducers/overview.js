import { GET_STATS,GET_TODAY_PICKUPS  } from '../actions/overview'



const initialState = {
    stats : {
        totalProfit : 459656,
        totalBookings : 67,
        totalCustomers : 34,
        totalDeposit : 785

    },
    todayPickups : null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_STATS:
            return {...state,stats:action.payload}
        case GET_TODAY_PICKUPS:
            return {...state,todayPickups:action.payload}
        default:
            return state;
    }
};