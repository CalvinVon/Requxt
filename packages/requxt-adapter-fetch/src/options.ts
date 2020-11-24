import { RequxtConfig, RequxtOptions } from "requxt";
import { TransformedOptions } from "./types";


/**
 * Merge options from `source` to `target`
 */
function mergeOptions(target: RequxtConfig, source: RequxtOptions): RequxtOptions {
    const { headers, adapterOptions, ...others } = target;
    const {
        headers: sourceHeaders,
        adapterOptions: sourceAdapterOptions,
        ...sourceOthers
    } = source;


    return {
        ...others,
        ...sourceOthers,
        headers: { ...headers, ...sourceHeaders },
        adapterOptions: { ...adapterOptions, ...sourceAdapterOptions },
    }
}

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
    mergeOptions,
    transformOptions
}
