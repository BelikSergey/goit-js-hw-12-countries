const apiAdress = `https://restcountries.eu/rest/v2/name/`;

export function fetchingRequest (value) {
    return fetch(`${apiAdress}${value}`).
    then(res => res.json())
};
