import Context from "./core/context";
import Requxt from "./core/requxt";

export interface PlainObject {
    [key: string]: any;
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
    /** requxt `options` */
    options: RequxtOptions;
    /** full `url` after parsed */
    fullUrl?: string;
};

export interface RequxtError<T = any> extends Error {
    code?: string;
    response?: RequxtResponse<T>;
    isRequxtError: boolean;
    /** requxt `options` */
    options: RequxtOptions;
    /** full `url` after parsed */
    fullUrl?: string;
}

export interface RequxtMetadata {
    method?: Method;
    url?: string;
    [field: string]: any;
};

export interface RequxtData {
    /**
     * URL query params
     * 
     * 配置 URL 查询参数
     */
    query?: PlainObject;

    /**
     * Support URL path dynamic parameters
     * 
     * 配置 URL 路径动态参数
     * 
     * @example
     * 
     * ```js
     * request({ url: '/user/:id', ... }, { params: { id: 108 } });
     * ```
     * is equal to:
     * 
     * ```js
     * const id = 108
     * request({ url: `/user/${id}`, ... });
     * ```
     */
    params?: PlainObject;
    /**
     * request body data
     * 
     * 配置作为请求体正文发送的数据
     */
    body?: PlainObject;
    [field: string]: any;
}


// TODO: 抹平配置差异
export interface RequxtConfig<T = any> {
    baseURL?: string;
    headers?: any;

    timeout?: number;
    timeoutErrorMessage?: string;

    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    onDownloadProgress?: (progressEvent: ProgressEvent) => void;
    validateStatus?: ((status: number) => boolean | null);

    mode?: RequestMode;
    credentials?: RequestCredentials | boolean;
    // cancelToken?: CancelToken;

    adapterOptions?: T;
};

export type RequxtOptions<T = any> = RequxtMetadata & RequxtData & RequxtConfig<T>;

export interface RequxtPromise<T = any> extends Promise<RequxtResponse<T>> { };

export interface RequxtInstance {
    <T = any>(options: RequxtOptions): RequxtPromise<T>;
    <T = any>(metadata: RequxtMetadata, data?: RequxtData, config?: RequxtConfig): RequxtPromise<T>;
    <T = any>(metadata: RequxtMetadata, options?: RequxtOptions): RequxtPromise<T>;
    interceptors: {
        request: InterceptorApi;
        response: InterceptorApi;
    }
};
//#endregion


//#region requxt utils related
export interface RequxtMetadataMapping {
    [name: string]: RequxtMetadata;
};

export interface RequxtMappingInstance {
    <T = any>(data?: RequxtData, config?: RequxtConfig): RequxtPromise<T>;
    <T = any>(options: RequxtOptions): RequxtPromise<T>;
    originRequest: RequxtInstance;
};

export interface MetadataCreator {
    (url: string, fields?: PlainObject): RequxtMetadata;
};
//#endregion


//#region requxt middleware related
export interface Middleware {
    (context: Context, next: NextMiddleware): Promise<any>;
};

export type NextMiddleware = () => Promise<any>;

export interface FinalMiddleware {
    (context: Context): Promise<any>;
};
//#endregion


//#region requxt adapter related
/**
 * An adapter should apply instance options and interceptors to core request,
 * and implements core middleware(s).
 * 
 * 适配器应将实例选项和拦截器应用于核心请求，并实现核心中间件
 */
export interface Adapter {

    (requxt: Requxt): void;

    /**
     * Apply interceptors to adapter
     * 
     * 将拦截器应用于适配器
     * @param interceptors interceptors 拦截器集合对象
     */
    applyInterceptors(interceptors: Interceptors): void;

    /**
     * Apply requxt options to the adapter
     */
    applyOptions(options: RequxtOptions): void;
    _optionsApplied?: boolean;
};
//#endregion

//#region interceptor

export interface InterceptorApi {
    use: <T>(handler: T) => number;
    eject: (id: number) => void;
    ejectAll: () => void;
};


export interface Interceptors {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
};

export type Interceptor = RequestInterceptor | ResponseInterceptor;
export interface RequestInterceptor {
    <T>(options: T): { options: T };
};
export interface ResponseInterceptor {
    <T, K, P = any>(response: K, options: T): { response: P; options: T; };
};
//#region