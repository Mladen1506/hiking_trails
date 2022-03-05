import { ajax } from "../utils/ajax-adapter";

export const ROUTE_SET = 'ROUTE_SET';
export const ROUTE_WITH_PARAMS_SET = 'ROUTE_WITH_PARAMS_SET';
export const REFRESH = 'REFRESH';
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

export const actionRouteWithParamsSet = (route, params) => {
    return {
        type: ROUTE_WITH_PARAMS_SET,
        payload: {
            route: route,
            params: params
        }
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

                    dispatch(actionLoginSuccess(myUserData));
                }
            })
    };
};

export const actionAuthFormLogin = (formState) => {
    //THUNK
    return (dispatch) => {
        ajax.authLogin(formState)
            .then((response) => {
                console.log(response);
                if (response && response.data && response.data.data && response.data.data.authLogin) {
                    const token = response.data.data.authLogin;
                    ajax.storeToken(token); // saving token on hard disc
                    ajax.configureHeaders(token);
                    // FORM LOGIN PROCEDURE DONE
                    dispatch(actionAuthAutoLogin()); // AUTOLOGIN PROCEDURE
                }
            })
    };
};

export const actionAuthRegister = (formState) => {
    //THUNK
    return (dispatch) => {
        ajax.authRegister(formState)
            .then(() => {
                dispatch({
                    type: ROUTE_SET,
                    payload: 'LOGIN'
                })
            })
    };
};

export const actionAuthLogout = () => {
    //THUNK
    return (dispatch) => {
        ajax.authLogout()
            .then(() => {
                ajax.deleteStoredToken();
                ajax.configureHeaders(null);
                dispatch({
                    type: LOGOUT
                });

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

export const actionReviewCreate = (formState) => {
    //THUNK
    return (dispatch) => {
        ajax.reviewCreate(formState)
            .then((response) => {
                console.log('response for create review works', response);
                dispatch({
                    type: REFRESH
                });
            })
    };
};

export const actionTourCreate = (formState) => {
    //THUNK
    return (dispatch) => {
        ajax.tourCreate(formState)
            .then((response) => {
                console.log(response);
                dispatch(actionRouteSet('MY_TOURS'));
            })
    };
};

export const actionTourUpdate = (formState) => {
    //THUNK
    return (dispatch) => {
        ajax.tourUpdate(formState)
            .then((response) => {
                console.log(response);
                dispatch(actionRouteSet('MY_TOURS'));
            })
    };
};

export const actionTourDelete = (formState) => {
    //THUNK
    return (dispatch) => {
        ajax.tourDelete(formState)
            .then((response) => {
                console.log(response);
                dispatch(actionRouteSet('MY_TOURS'));
            })
    };
};