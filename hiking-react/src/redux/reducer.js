import { dummyReviews } from "../utils/dummy-reviews";
import { dummyTours } from "../utils/dummy-tours";

const initialState = {
    route: 'HOME',
    tours: dummyTours,
    reviews: dummyReviews,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'ROUTE_SET':
            return {
                ...state,
                route: action.payload
            };

        default:
            return state;
    }
};

export default rootReducer;