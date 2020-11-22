import { setOptions } from 'requxt-fetch';

setOptions({
    baseURL: 'http://localhost:7000',
    headers: {
        'X-Custom-Header': 'Requxt example demo'
    }
});