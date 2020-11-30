import {
    RequxtMetadataMapping,
    RequxtInstance,
    RequxtMappingInstance,
    RequxtOptions,
    RequxtConfig,
    RequxtData,
    AdapterConstructor
} from "../types";
import Requxt from "./requxt";

const extend = (options?: RequxtConfig, adapterCtor?: AdapterConstructor) => {
    const ins = new Requxt(options);
    if (adapterCtor) {
        ins.adapt(adapterCtor);
    }
    return {
        request: ins.build(),
        use: ins.use.bind(ins),
        setAdapter: ins.adapt.bind(ins),
        setOptions: (opts: RequxtConfig) => ins.setOptions({
            ...options,
            ...opts
        })
    }
};

function mapper<T extends RequxtMetadataMapping>(request: RequxtInstance, metadatas: T): { [P in keyof T]: RequxtMappingInstance } {
    const mapping = <{ [P in keyof T]: RequxtMappingInstance }>{};
    for (const name in metadatas) {
        const metadata = metadatas[name];
        const mappingRequest = <K>(data?: RequxtData | RequxtOptions, config?: RequxtConfig) => {
            return request<K>(metadata, data, config);
        };
        mapping[name] = mappingRequest as RequxtMappingInstance;
        mapping[name].originRequest = request;
    }

    return mapping;
}


function buildFullPath(requestedURL: string, baseURL?: string) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(requestedURL, baseURL);
    }
    return requestedURL;
};

function isAbsoluteURL(url: string): boolean {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

function combineURLs(relativeURL: string, baseURL?: string) {
    return (baseURL || '').replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};

function isObject (value: any) {
    return Object.prototype.toString.call(value) === '[object Object]';
}


export {
    extend,
    mapper,
    buildFullPath,
    isObject
};
