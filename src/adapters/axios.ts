import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Middleware, Adapter, RequxtResponse, RequxtError } from "../types";
import Context from "../core/context";
import Requxt from "../core/requxt";
import { composeInterceptors } from '../core/interceptor';

interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
    handlers: {
        fulfilled: (value: V) => V | Promise<V>;
        onRejected: (error: any) => any;
    }[]
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

const coreMiddleware: Middleware = async (context: Context) => {
    return axios({
        url: context.url,
        method: context.method,
        data: context.body,
        params: context.query
    })
        .then(res => {
            context.response = transformAxiosResponse(context, res);
        })
        .catch(err => {
            context.error = transformAxiosError(context, err);
        });
};

const adapter: Adapter = (requxt: Requxt) => {
    requxt.onion.use(coreMiddleware, { core: true });
};

adapter.applyInterceptors = interceptors => {
    const {
        request: composedRequestInterceptor,
        response: composedResponseInterceptor
    } = composeInterceptors(interceptors);

    const requestInterceptor = (config: AxiosRequestConfig) => {
        let options;
        try {
            options = composedRequestInterceptor<AxiosRequestConfig>(config).options;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
        return options;
    };

    const responseInterceptor = (response: AxiosResponse) => {
        let res = response;
        let options = response.config;

        try {
            const result = composedResponseInterceptor<AxiosRequestConfig, AxiosResponse>(res, options);
            res = result.response;
            options = result.options;

            res.config = options;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }

        return res;
    };
    (axios.interceptors.request as AxiosInterceptorManager<AxiosRequestConfig>).handlers = [
        {
            fulfilled: requestInterceptor,
            onRejected: requestInterceptor
        }
    ];
    (axios.interceptors.response as AxiosInterceptorManager<AxiosResponse>).handlers = [
        {
            fulfilled: responseInterceptor,
            onRejected: responseInterceptor
        }
    ];

};

adapter.applyOptions = (options) => {
    axios.defaults.baseURL = options.baseURL;
    axios.defaults.headers = options.headers;
    axios.defaults.responseType = options.responseType;
};

export default adapter;
export {
    AxiosRequestConfig,
    AxiosResponse
};
