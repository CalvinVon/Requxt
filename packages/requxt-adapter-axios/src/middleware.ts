import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Context, Middleware, RequxtError, RequxtOptions, RequxtResponse } from "requxt";

function transformAxiosConfig(context: Context): AxiosRequestConfig {
    const {
        cache,
        credentials,
        adapterOptions,
    } = context.options as RequxtOptions<AxiosRequestConfig>;

    const options: AxiosRequestConfig = {
        url: context.url,
        method: context.method,
        data: context.body,
        params: context.query,
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

    return options;
}


function transformAxiosResponse(context: Context, response: AxiosResponse): RequxtResponse {
    return {
        data: response,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        options: context.options,
        fullUrl: context.url,
    };
}

function transformAxiosError(context: Context, error: AxiosError): RequxtError {
    const requxtError: RequxtError = {
        options: context.options,
        fullUrl: context.url,
        isRequxtError: true,
        message: error.message,
        name: error.message,
        code: error.message,
        stack: error.stack
    };

    if (error.response) {
        const response: RequxtResponse = transformAxiosResponse(context, error.response);
        requxtError.response = response
    }

    return requxtError;
}

const useMiddleware = (axios: AxiosInstance) => {
    const coreMiddleware: Middleware = async (context: Context) => {
        const axiosConfig: AxiosRequestConfig = transformAxiosConfig(context);
        return axios(axiosConfig)
            .then(res => {
                context.response = transformAxiosResponse(context, res);
            })
            .catch(err => {
                context.error = transformAxiosError(context, err);
            });
    };

    return coreMiddleware;
};

export default useMiddleware;
