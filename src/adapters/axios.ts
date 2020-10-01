import { Middleware, Adapter, RequxtResponse, RequxtError } from "../types";
import Context from "../core/context";
import Requxt from "../core/requxt";
import axios, { AxiosError, AxiosResponse } from 'axios';


function transformAxiosResponse(context: Context, response: AxiosResponse): RequxtResponse {
    return {
        data: response.data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        options: context.options,
        fullUrl: context.url,
        originResponse: response
    };
}

function transformAxiosError(context: Context, error: AxiosError): RequxtError {
    const requxtError: RequxtError = {
        options: context.options,
        fullUrl: context.url,
        isRequxtError: true,
        originError: error,
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
    adapter.applyOptions(requxt.options);
    requxt.onion.use(coreMiddleware, { core: true });
};

adapter.applyOptions = (options) => {
    axios.defaults.baseURL = options.baseURL;
    axios.defaults.headers = options.headers;
    axios.defaults.responseType = options.responseType;
};

export default adapter;