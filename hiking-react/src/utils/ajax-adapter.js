// ALL AJAX REQUESTS
import axios from "axios";
import { convert_to_json } from "./ajax-utils";

export const ajax = {};

ajax.storeToken = (token) => {
    window.localStorage.setItem('hiking_token', token);
};
ajax.getStoredToken = () => {
    const token = window.localStorage.getItem('hiking_token');
    return token;
};

ajax.authRegister = async(formData) => {
    // sending request for new user restration 

    // GRAPHQL
    const graphql_query = {
        query: '{ authRegister( username: "' + formData.username + '" password: "' + formData.password + '" password2: "' + formData.password2 + '") }'
    };
    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
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
        query: '{ username: "' + formData.username + '" password: "' + formData.password + '") }'
    };
    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('Axios response for authLogin works', response)
    return response;
};
ajax.myUserData = async(formData) => {
    // sending request for new user restration 
    const token = ajax.getStoredToken();
    // GRAPHQL
    const graphql_query = {
        query: '{ myUserData( token: "' + token + '") { _id username } }'
    };
    const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
    const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('Axios response for myUserData works', response)
    return response;
};


ajax.salji_post_request = () => {
    // regular request

    // graphql request
};
// web browser
ajax.sacuvaj_token_lokalno_i_trajno = (token) => {
    // window.localStorage.setItem('hiking_token', token)

    // android native app
    // androidStorage('hiking_token', token)
};