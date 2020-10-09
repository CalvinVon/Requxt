import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Context, Middleware, RequxtError, RequxtResponse } from "requxt";

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

    return coreMiddleware;
};

export default useMiddleware;
