import { composeInterceptors, Context, FinalMiddleware, RequxtError, RequxtResponse } from "requxt";
import FetchAdapter from ".";
import { mergeOptions, transformOptions } from "./options";
import { FetchInterceptorOptions } from "./types";

async function transformFetchResponse(context: Context, originRespose: Response, response: any): Promise<RequxtResponse<Response, any>> {
    if (response instanceof Response) {
        response = await response.json();
    }
    return {
        data: response,
        headers: originRespose.headers,
        options: context.options,
        status: originRespose.status,
        statusText: originRespose.statusText,
        fullUrl: originRespose.url,
        originResponse: originRespose
    };
}


function transformFetchError(context: Context, error: any): RequxtError<Response> {
    return {
        isRequxtError: true,
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
        options: context.options,
        fullUrl: context.url,
    };
}

function applyCoreMiddleware(adapter: FetchAdapter) {
    const coreMiddleware: FinalMiddleware = async (context: Context) => {
        const intercepter = composeInterceptors(adapter.interceptors);
        // merge optionss
        const mergedOptions = mergeOptions(adapter.globalRequxtOptions, context.options);
        // transform requxt options to available fetch options
        // `requxtOptions` includes features that origin `fetch` do NOT contains
        const { fetchOptions, requxtOptions } = transformOptions(mergedOptions);

        // intercept request
        const { options: fetchConfig } = await intercepter.request<FetchInterceptorOptions>({
            url: context.url,
            ...fetchOptions
        });

        try {
            const originResponse: Response = await fetch(fetchConfig.url, fetchConfig);

            // intercept response
            const { response } = await intercepter.response(originResponse, fetchConfig);
            context.response = await transformFetchResponse(context, originResponse, response);
        } catch (error) {
            context.error = transformFetchError(context, error);
        }
    };
    return coreMiddleware;
}



export default applyCoreMiddleware;
