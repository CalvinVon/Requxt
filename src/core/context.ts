import { RequxtMetadata, RequxtOptions, RequxtResponse, RequxtData, PlainObject, RequxtError } from '../types';

export default class Context {

    private _metadata: RequxtMetadata;
    private _options: RequxtOptions = {};
    private _response: RequxtResponse | null = null;
    private _error: RequxtError | null = null;

    constructor(metadata: RequxtMetadata, options?: RequxtOptions) {
        this._metadata = metadata;
        if (options) {
            this._options = options;
        }

    }

    set metadata(metadata: RequxtMetadata) {
        this._metadata = metadata;
    }

    get metadata(): RequxtMetadata {
        return { ...this._metadata };
    }


    get options(): RequxtOptions {
        return { ...this._metadata, ...this._options };
    }

    set options(value: RequxtOptions) {
        this._options = value;
    }


    get response(): RequxtResponse | null {
        return this._response;
    }

    set response(value: RequxtResponse | null) {
        this._response = value;
    }


    get error(): RequxtError | null {
        return this._error;
    }

    set error(value: RequxtError | null) {
        this._error = value;
    }


    /**
     * Get computed url string
     * 
     * 获取计算过之后的 url 字符串
     */
    get url() {
        const { url } = this._metadata;
        const { params, baseURL } = this.options;

        if (!url) return this.options.baseURL;

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

    get method() {
        return this.options.method || this.metadata.method;
    }

    get data(): RequxtData {
        return {
            query: this.options.query,
            params: this.options.params,
            body: this.options.body
        }
    }

    /**
     * Access request data, including url `query`, url path `params`, request `body` data.
     * 
     * 访问请求数据集合，包括 url 查询参数配置，url 地址参数对配置，请求体数据包配置。
     */
    set data({ query, params, body }: RequxtData) {
        this._options.query = query;
        this._options.params = params;
        this._options.body = body;
    }


    /**
     * Access request url `params`
     * 
     * 访问请求 url 地址参数对配置
     */
    set query(query: PlainObject) {
        this._options.query = query;
    }

    get query() {
        return this.options.query as PlainObject;
    }


    /**
     * Access request url `query`
     * 
     * 访问请求 url 查询参数配置
     */
    set params(params: PlainObject) {
        this._options.params = params;
    }

    get params() {
        return this._options.params as PlainObject;
    }

    /**
     * Access request `body` data
     * 
     * 访问请求体数据包配置
     */
    set body(body: PlainObject) {
        this._options.body = body;
    }

    get body() {
        return this._options.body as PlainObject;
    }
}
