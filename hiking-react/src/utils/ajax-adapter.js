// ALL AJAX REQUESTS
import config from "./config";
import { urlLib } from "./url-lib";
import axios from "axios";
import { convert_to_json } from "./ajax-utils";

export const ajax = {};

ajax.storeToken = (token) => {
    window.localStorage.setItem(config.TOKEN_LOCALSTORAGE_KEY, token);
};
ajax.getStoredToken = () => {
    const token = window.localStorage.getItem(config.TOKEN_LOCALSTORAGE_KEY);
    return token;
};

ajax.deleteStoredToken = () => {
    const token = window.localStorage.removeItem(config.TOKEN_LOCALSTORAGE_KEY);
    return token;
};

ajax.preparedHeadersForAxios = {
    'Content-Type': 'application/json'
};

ajax.configureHeaders = (token) => {
    if (token === null) {
        ajax.preparedHeadersForAxios = {
            'Content-Type': 'application/json'
        };
    } else {
        ajax.preparedHeadersForAxios = {
            'Content-Type': 'application/json',
            // 'x-hiking-token': token
            [config.TOKEN_HEADER_KEY]: token
        };
    }
};

ajax.authRegister = async(formData) => {
    // sending request for new user restration 

    // GRAPHQL
    const graphql_query = {
        query: '{ authRegister( username: "' + formData.username + '" password: "' + formData.password + '" password2: "' + formData.password2 + '") }'
    };
    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('Axios response for authRegister works', response)
    return response;
};

ajax.authLogin = async(formData) => {
    // sending request for new user restration 

    // GRAPHQL
    const graphql_query = {
        query: '{ authLogin( username: "' + formData.username + '" password: "' + formData.password + '") }'
    };
    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('Axios response for authLogin works', response)
    return response;
};
ajax.authLogout = async(formData) => {
    // sending request for new user restration 
    // const token = ajax.getStoredToken();
    // GRAPHQL
    // const graphql_query = {
    //     query: '{ authLogout( token: "' + token + '") }'
    // };
    const graphql_query = {
        query: '{ authLogout }'
    };
    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for authLogout works', response)
    return response;
};

ajax.myUserData = async(formData) => {
    // sending request for new user restration 
    const token = ajax.getStoredToken();
    ajax.configureHeaders(token);
    // GRAPHQL
    // const graphql_query = {
    //     query: '{ myUserData( token: "' + token + '") { is_success _id username } }'
    // };
    const graphql_query = {
        query: '{ myUserData { is_success _id username } }'
    };
    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for myUserData works', response)
    return response;
};

ajax.tourCreate = async(formData) => {
    // sending request for create new tour

    // GRAPHQL
    const graphql_query = {
        query: '{ tourCreate( name: "' + formData.name + '" description: "' + formData.description + '" date: "' + formData.date + '" difficulty: "' + formData.difficulty + '" trail_length: ' + formData.trail_length + ' max_participants: ' + formData.max_participants + ')}'
    };

    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for tourCreate works', response)
    return response;
};

ajax.tourUpdate = async(formData) => {
    // sending request for create new tour

    // GRAPHQL
    const graphql_query = {
        query: '{ tourUpdate( name: "' + formData.name + '" description: "' + formData.description + '" date: "' + formData.date + '" difficulty: "' + formData.difficulty + '" trail_length: ' + formData.trail_length + ' max_participants: ' + formData.max_participants + ' tour_id: "' + formData.tour_id + '")}'
    };

    // name: '',
    //     description: '',
    //     date: '02/09/2022',
    //     trail_length: '1',
    //     difficulty: '',
    //     max_participants: '10'


    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for tourUpdate works', response)
    return response;
};

ajax.tourDelete = async(tour_id) => {
    // sending request for tourDelete new tour

    // GRAPHQL
    const graphql_query = {
        query: '{ tourDelete( tour_id: "' + tour_id + '")}'
    };

    // name: '',
    //     description: '',
    //     date: '02/09/2022',
    //     trail_length: '1',
    //     difficulty: '',
    //     max_participants: '10'


    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for tourDelete works', response)
    return response;
};

ajax.tourGetAll = async() => {
    // sending request to get All tours from backend

    // GRAPHQL

    // const graphql_query = {
    //     query: '{ tourGetAll { _id name description date difficulty trail_length max_participants user_id } }'
    // };

    const graphql_query = {
        query: '{ tourGetAll { _id name description date difficulty trail_length max_participants user_id } }'
    };

    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for tourGetAll works', response)
    return response;
};

ajax.reviewCreate = async(formData) => {
    // sending request for create new review

    // GRAPHQL
    const graphql_query = {
        query: '{ reviewCreate( rating: ' + formData.rating + ' text: "' + formData.text + '" tour_id: "' + formData.tour_id + '" )}'
    };

    // rating: 0,
    //     text: '',
    //     tour_id: tour_id,


    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for tourCreate works', response)
    return response;
};

ajax.reviewGetAll = async() => {
    // sending request to get All reviews from backend

    // GRAPHQL

    const graphql_query = {
        query: '{ reviewGetAll { _id user_id tour_id rating text } }'
    };

    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for reviewGetAll works', response)
    return response;
};

ajax.userProfileGet = async(user_id) => {

    // GRAPHQL
    const graphql_query = {
        query: '{ userProfileGet( user_id: "' + user_id + '") { is_success _id username } }'
    };

    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
        headers: ajax.preparedHeadersForAxios
    });
    console.log('Axios response for userProfileGet works', response)
    return response;
};


ajax.salji_post_request = () => {
    // regular request

    // graphql request
};
// web browser
ajax.sacuvaj_token_lokalno_i_trajno = (token) => {
    // window.localStorage.setItem(config.TOKEN_LOCALSTORAGE_KEY, token)

    // android native app
    // androidStorage(config.TOKEN_LOCALSTORAGE_KEY, token)
};