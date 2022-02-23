export const convert_to_json = (data) => {
    let json = '';
    try {
        json = JSON.stringify(data);
    } catch (err) {
        // in case we weren 't able to convert to json app wont brake it will only log error
        console.log(err);
    }
    return json;
};