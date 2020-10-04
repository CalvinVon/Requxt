import { RequxtMetadata, RequxtOptions, RequxtResponse, RequxtData, PlainObject, RequxtError } from '../types';

export default class Context {

    /**
     * The `metadata` (partial options) of request
     * 
     * 请求元数据（部分选项）
     */
    public metadata: Readonly<RequxtOptions> & PlainObject = {};

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
        options: RequxtOptions
    ) {
        // avoid to modify origin metadata
        this.metadata = { ...metadata };
        this.options = options;
    }


    /**
     * Get computed `url` string
     * 
     * 获取计算过之后的 `url` 字符串
     */
    get url() {
        const { url, params, baseURL } = this.options;

        if (!url) return baseURL;

        if (params) {
            // handle api like /a/:id/b/{param}
            return (baseURL || '') + url
                .replace(/\B(?::(\w+)|{(\w+)})/g, (...args: string[]) => {
                    return params[args[1] || args[2]];
                });
        }
        else {
            return (baseURL || '') + url;
        }
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
    set query(query: PlainObject) {
        this.options.query = query;
    }

    get query(): PlainObject {
        return this.options.query;
    }


    /**
     * Access request url `query`
     * 
     * 访问请求 url 查询参数配置
     */
    set params(params: PlainObject) {
        this.options.params = params;
    }

    get params(): PlainObject {
        return this.options.params;
    }

    /**
     * Access request `body` data
     * 
     * 访问请求体数据包配置
     */
    set body(body: PlainObject) {
        this.options.body = body;
    }

    get body(): PlainObject {
        return this.options.body;
    }
}
