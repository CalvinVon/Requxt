import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Context, Middleware, RequxtError, RequxtResponse } from "requxt-core";
import { transformAxiosConfig } from "./options";


function transformAxiosResponse(context: Context, response: AxiosResponse): RequxtResponse {
    return {
        data: response.data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        options: context.options,
        fullUrl: context.fullUrl,
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

const applyMiddleware = (axiosInstance: AxiosInstance) => {
    const coreMiddleware: Middleware = async (context: Context) => {
        const axiosConfig: AxiosRequestConfig = transformAxiosConfig(context);
        try {
            const res = await axiosInstance(axiosConfig);
            context.response = transformAxiosResponse(context, res);
        } catch (err) {
            context.error = transformAxiosError(context, err);
        }
    };

    return coreMiddleware;
};

export default applyMiddleware;
