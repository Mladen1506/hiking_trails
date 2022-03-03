import { ajax } from "../utils/ajax-adapter";

export const ROUTE_SET = 'ROUTE_SET';
export const ROUTE_WITH_PARAMS_SET = 'ROUTE_WITH_PARAMS_SET';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const TOURS_FETCHING = 'TOURS_FETCHING';
export const TOURS_FETCHED = 'TOURS_FETCHED';
export const TOURS_FAIL = 'TOURS_FAIL';
export const REVIEWS_FETCHING = 'REVIEWS_FETCHING';
export const REVIEWS_FETCHED = 'REVIEWS_FETCHED';
export const REVIEWS_FAIL = 'REVIEWS_FAIL';


// ACTIONS CREATORS

export const actionRouteSet = (route) => {
    return {
        type: ROUTE_SET,
        payload: route
    };
};


export const actionLoginSuccess = (myUserData) => {
    // ACTIONS CREATOR
    return {
        type: LOGIN_SUCCESS,
        payload: myUserData
    };
};

export const actionAuthAutoLogin = () => {
    // THUNK
    return (dispatch) => {
        ajax.myUserData()
            .then((response) => {
                // console.log('test 2')
                console.log('.then() response for my user data', response)
                if (response && response.data && response.data.data && response.data.data.myUserData && response.data.data.myUserData._id) {
                    console.log(response.data.data.myUserData)
                    const myUserData = response.data.data.myUserData;
                    // dispatch({
                    //   type: LOGIN_SUCCESS,
                    //   payload: myUserData
                    // });
                    dispatch(actionLoginSuccess(myUserData));
                }
            })
    };
};

export const actionToursNeeded = () => {
    return (dispatch) => {

        dispatch({
            type: TOURS_FETCHING
        });
        setTimeout(() => {
            ajax.tourGetAll()
                .then((response) => {
                    console.log('response za tour get all');
                    console.log(response);

                    if (response && response.data && response.data.data && Array.isArray(response.data.data.tourGetAll)) {
                        dispatch({
                            type: TOURS_FETCHED,
                            payload: response.data.data.tourGetAll
                        });
                    }
                })
        }, 500)
    };
};

export const actionReviewsNeeded = () => {
    return (dispatch) => {
        dispatch({
            type: REVIEWS_FETCHING
        });
        ajax.reviewGetAll()
            .then((response) => {
                console.log('response for review get all');
                console.log(response);

                if (response && response.data && response.data.data && Array.isArray(response.data.data.reviewGetAll)) {
                    dispatch({
                        type: REVIEWS_FETCHED,
                        payload: response.data.data.reviewGetAll
                    });
                }
            })
    };
};