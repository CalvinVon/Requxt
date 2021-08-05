import axios from "axios";
import { Context } from "requxt-core";
import { AxiosRequestConfig } from ".";

export function transformAxiosConfig(context: Context): AxiosRequestConfig {
    const {
        cache,
        credentials,
        adapterOptions,
        signal
    } = context.options;

    const options: AxiosRequestConfig = {
        ...context.options,
        url: context.fullUrl,
        method: context.method,
        data: context.body,
        // query has been handled by core
        params: {},
        query: undefined,
        ...adapterOptions
    };

    // adapter credentials
    if (credentials === 'include') {
        options.withCredentials = true;
    }
    else if (credentials === 'omit') {
        options.withCredentials = false;
    }


    // adapter cache
    if (context.method?.toUpperCase() === 'GET' || context.method?.toUpperCase() === 'HEAD') {
        if (cache === 'no-store' || cache === 'no-cache') {
            // Search for a '_' parameter in the query string
            const reParamSearch = /([?&])_=[^&]*/;
            if (reParamSearch.test(context.url || '')) {
                // If it already exists then set the value with the current time
                options.url = (options.url || '').replace(reParamSearch, '$1_=' + new Date().getTime());
            }
            else {
                // Otherwise add a new '_' parameter to the end with the current time
                const reQueryString = /\?/;
                options.url += (reQueryString.test(options.url || '') ? '&' : '?') + '_=' + new Date().getTime();
            }
        }
    }


    // adapter signal
    if (signal) {
        const { cancel, token } = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            cancel('The user aborted a request.');
        });
        options.cancelToken = token;
    }

    return options;
}
