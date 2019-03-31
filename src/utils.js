import { ajax } from "rxjs/ajax";

export const makeRequest = (resource, method = 'GET', body) => {
    const endpoint = 'http://localhost:8080'

    let withCredentials = true;
    let ajaxRequest = {
        url: endpoint + resource,
        withCredentials,
        async: true,
        method,
    }

    if (method === 'POST') {
        ajaxRequest = Object.assign({}, ajaxRequest, {
            body,
            headers: {'Content-Type': 'application/json'},
        })
    }

    return ajax(ajaxRequest)
}