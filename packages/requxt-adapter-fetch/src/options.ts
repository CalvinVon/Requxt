import { RequxtOptions } from "requxt-core";
import { TransformedOptions } from "./types";


/**
 * Transform requxt options to origin fetch options
 */
function transformOptions(options: RequxtOptions): TransformedOptions {
    const {
        cache,
        credentials,
        headers,
        mode,
        signal,

        adapterOptions,
        ...restOptions
    } = options;

    const fetchOptions: RequestInit = {
        cache,
        headers,
        mode,
        signal,
        ...adapterOptions
    };


    if (typeof credentials === 'boolean') {
        fetchOptions.credentials = credentials ? 'include' : 'omit';
    }
    else {
        fetchOptions.credentials = credentials;
    }

    return {
        fetchOptions,
        requxtOptions: restOptions
    };
};


export {
    transformOptions
}
