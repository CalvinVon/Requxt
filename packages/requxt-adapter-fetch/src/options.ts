import { RequxtConfig } from "requxt";

function applyOptions(options: RequxtConfig<RequestInit>): RequestInit {
    const {
        cache,
        credentials
    } = options;

    const fetchOptions: RequestInit = {
        cache,
    };

    if (typeof credentials === 'boolean') {
        fetchOptions.credentials = 'include';
    }
    else {
        fetchOptions.credentials = credentials;
    }

    return fetchOptions;
};

export default applyOptions;
