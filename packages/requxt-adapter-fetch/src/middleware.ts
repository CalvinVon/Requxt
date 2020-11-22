import { composeInterceptors, Context, FinalMiddleware, PlainObject, RequxtError, RequxtQuery, RequxtResponse } from "requxt";
import FetchAdapter from ".";
import { mergeOptions, transformOptions } from "./options";
import { FetchInterceptorOptions } from "./types";


async function transformFetchResponse(context: Context, originResponse: Response, response: any): Promise<RequxtResponse<Response, any>> {
    if (response instanceof Response) {
        const type = context.options.responseType;
        switch (type) {
            case "json": response = await response.json(); break;
            case "arraybuffer": response = await response.arrayBuffer(); break;
            case "text": response = await response.text();
            case "blob": response = await response.blob();
            case "stream": response = response.body; break;
            case "document": response = await response.json(); break;

            default:
                break;
        }
    }

    const headers: PlainObject = {};
    originResponse.headers.forEach((value, key) => {
        headers[key] = value;
    });

    return {
        data: response,
        headers,
        options: context.options,
        status: originResponse.status,
        statusText: originResponse.statusText,
        fullUrl: originResponse.url,
        originResponse: originResponse
    };
}


function transformFetchError(context: Context, error: any, response?: RequxtResponse): RequxtError<Response> {
    return {
        isRequxtError: true,
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
        options: context.options,
        fullUrl: context.fullUrl,
        response: response
    };
}


function timeout2Throw(timeout?: number, timeoutErrorMessage?: string): Promise<never> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const error = new Error(timeoutErrorMessage || 'timeout of ' + timeout + 'ms exceeded');
            (error as any).code = 'TimeoutError';
            reject(error);
        }, timeout);
    });
}

/**
 * Simulate progress events
 * @reference https://jakearchibald.com/2016/streams-ftw/
 */
function applyBodyReadProgress(response: Response, listener: (progressEvent: ProgressEvent) => void) {
    const reader = response.body?.getReader();
    let bytesReceived = 0;

    // read() returns a promise that resolves when a value has been received
    reader?.read().then(function processResult(result): Promise<any> {
        // Result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (result.done) {
            console.log("Fetch complete");
            return null as unknown as any;
        }

        // result.value for fetch streams is a Uint8Array
        bytesReceived += result.value.length;
        console.log("Received", bytesReceived, "bytes of data so far");

        // Read some more, and call this function again
        return reader?.read().then(processResult);
    });
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
            url: context.fullUrl,
            ...fetchOptions
        });

        try {
            const {
                timeout,
                timeoutErrorMessage,
                validateStatus,
                onDownloadProgress
            } = requxtOptions;
            let originResponse: Response;
            const request = fetch(fetchConfig.url, fetchConfig);

            // apply `timeout`
            if (timeout) {
                originResponse = await Promise.race([
                    request,
                    timeout2Throw(timeout, timeoutErrorMessage)
                ]);
            }
            else {
                originResponse = await request;
            }

            const clonedResponse = originResponse.clone();

            // apply `onDownloadProgress`
            // TODO: onDownloadProgress/onUploadProgress
            // different between node and browser
            if (onDownloadProgress) {
                applyBodyReadProgress(originResponse, onDownloadProgress);
            }

            // intercept response
            const { response } = await intercepter.response(originResponse, fetchConfig);
            context.response = await transformFetchResponse(context, clonedResponse, response);

            // apply `validateStatus`
            if (!validateStatus!(originResponse.status)) {
                const error = new Error('http error');
                (error as any).code = 'HttpError';
                return context.error = transformFetchError(context, error, context.response);
            }
        } catch (error) {
            context.error = transformFetchError(context, error);
        }
    };
    return coreMiddleware;
}



export default applyCoreMiddleware;
