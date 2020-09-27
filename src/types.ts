import Context from "./core/context";
import Requxt from "./core/requxt";

export interface PlainObject {
    [props: string]: any;
};

//#region request related
export type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';

export type ResponseType =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream';

export interface RequxtResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    options: RequxtOptions;
    originResponse: any;
};

export interface RequxtError<T = any> extends Error {
    code?: string;
    response?: RequxtResponse<T>;
    isRequxtError: boolean;
    options: RequxtOptions;
    originError: any;
}

export interface RequxtMetadata {
    method?: Method;
    url?: string;
    [field: string]: any;
};

export interface RequxtData {
    query?: PlainObject;
    params?: PlainObject;
    body?: PlainObject;
    [field: string]: any;
}

// TODO: 抹平配置差异
export interface RequxtConfig {
    baseURL?: string;
    headers?: any;

    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;

    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    onDownloadProgress?: (progressEvent: ProgressEvent) => void;
    validateStatus?: ((status: number) => boolean | null);

    // cancelToken?: CancelToken;
};

export type RequxtOptions = RequxtMetadata & RequxtData & RequxtConfig;

export interface RequxtInstance<T = any> {
    (metadata: RequxtMetadata, data?: RequxtData, config?: RequxtConfig): Promise<T>;
    (metadata: RequxtMetadata, options?: RequxtOptions): Promise<T>;
    (options: RequxtOptions): Promise<T>;
};
//#endregion


//#region requxt utils related
export interface RequxtMetadataMapping {
    [name: string]: RequxtMetadata;
};

export interface RequxtMappingInstance<T = any> {
    (options?: RequxtOptions): Promise<T>;
};
//#endregion


//#region requxt middleware related
export interface Middleware {
    (context: Context, next: NextMiddleware): Promise<any>;
};

export type NextMiddleware<T = any> = () => Promise<T>;

export interface FinalMiddleware {
    (context: Context): Promise<any>;
};
//#endregion


//#region requxt adapter related
export interface Adapter {
    (requxt: Requxt): void;
    applyOptions(options: RequxtOptions): void;
    _adapted?: boolean;
};
//#endregion
