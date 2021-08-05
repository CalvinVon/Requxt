import { RequxtMetadata, RequxtResponse, RequxtData, PlainObject, RequxtError, RequxtConfig, RequxtOptions, RequxtQuery, RequxtParams, RequxtBody } from '../types';
import { parseUrl, stringifyUrl } from "query-string";
import { buildFullPath, isObject } from './utils';

export default class Context {

    public options!: RequxtOptions;

    /**
     * The `metadata` (partial options) of request
     * 
     * 请求元数据（部分选项）
     */
    public metadata: Readonly<RequxtConfig> & PlainObject;

    /**
     * The `response` data of request
     * 
     * 请求响应数据
     */
    public response: RequxtResponse | null = null;

    /**
     * The (response) `error` of request
     * 
     * 请求失败数据
     */
    public error: RequxtError | null = null;

    [field: string]: any;

    constructor(
        metadata: RequxtMetadata,
        /**
         * The requxt `options`
         */
        options: RequxtOptions
    ) {
        // avoid to modify origin metadata
        this.metadata = { ...metadata };
        this.options = {
            ...options,
            ...metadata,
            ...this.parseData(options)
        };
    }

    private parseData(options: RequxtData): RequxtData {
        // ensure requxt data exsit
        const { query, params, body } = options;

        return {
            query: isObject(query) ? query : {},
            params: isObject(params) ? params : {},
            body: body || {}
        }
    }


    /**
     * Get the `url` string after filling the `params` parameter, but does not include the `query` query string.
     * This value is calculated in real time
     * 
     * 获取将 `params` 参数填入之后的 `url` 字符串，但是不包含 `query` 查询字符串。
     * 此值为实时计算值
     */
    get url() {
        const { url, params, baseURL } = this.options;
        const fullUrl = buildFullPath(url, baseURL);

        if (params) {
            // handle api like /a/:id/b/{param}
            return fullUrl
                .replace(/\B(?::(\w+)|{(\w+)})/g, (...args: string[]) => {
                    return params[args[1] || args[2]];
                });
        }
        else {
            return fullUrl;
        }
    }

    /**
     * The full `url` string requested
     * 
     * 完整的请求 url 路径。
     */
    get fullUrl() {
        const { url: parsedUrl, query: parsedQuery } = parseUrl(this.url);
        return stringifyUrl({ url: parsedUrl, query: { ...parsedQuery, ...this.query } });
    }

    /**
     * Get request `method`
     * 
     * 获取请求 `方法`
     */
    get method() {
        return this.options.method;
    }


    /**
     * Access request data, including url `query`, url path `params`, request `body` data.
     * 
     * 访问请求数据集合，包括 url 查询参数配置，url 地址参数对配置，请求体数据包配置。
     */
    set data({ query, params, body }: RequxtData) {
        this.options.query = query;
        this.options.params = params;
        this.options.body = body;
    }

    get data(): RequxtData {
        return {
            query: this.options.query,
            params: this.options.params,
            body: this.options.body
        }
    }


    /**
     * Access request url `params`
     * 
     * 访问请求 url 地址参数对配置
     */
    get query() {
        return this.options.query!;
    }

    set query(value: RequxtQuery) {
        this.options.query = value;
    }


    /**
     * Access request url `query`
     * 
     * 访问请求 url 查询参数配置
     */
    get params() {
        return this.options.params!;
    }

    set params(value: RequxtParams) {
        this.options.params = value;
    }

    /**
     * Access request `body` data
     * 
     * 访问请求体数据包配置
     */
    get body() {
        return this.options.body!;
    }

    set body(value: RequxtBody) {
        this.options.body = value;
    }
}
