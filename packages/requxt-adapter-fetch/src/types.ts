import { RequxtConfig, RequxtMetadata, RequxtData } from 'requxt';

export interface RequxtFetchConfig extends RequxtConfig {
    headers?: HeadersInit;
    adapterOptions?: RequestInit;
}

export type RequxtFetchOptions = RequxtMetadata & RequxtData & RequxtFetchConfig;

export interface TransformedOptions {
    fetchOptions: RequestInit;
    requxtOptions: RequxtFetchOptions;
}

export type FetchInterceptorOptions = RequestInit & {
    url: string;
}
