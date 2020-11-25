import Context from "./Context";
import Onion from "./Onion";
import {
    Middleware,
    AdapterInterface,
    RequxtInstance,
    RequxtOptions,
    RequxtMetadata,
    RequxtData,
    RequxtConfig,
    RequxtResponse,
    RequxtPromise,
    AdapterConstructor,
    Interceptors
} from "../types";
import { applyAllInterceptors, useInterceptors } from "./interceptor";

export default class Requxt {
    static defaults: RequxtConfig = {
        credentials: true,
        mode: "cors",
        responseType: "json",
        timeout: 0,
        validateStatus(status) {
            return status >= 200 && status < 300;
        }
    };

    defaults: RequxtConfig = Requxt.defaults;
    onion: Onion = new Onion();
    options?: RequxtConfig;
    adapter?: AdapterInterface;
    interceptors: Interceptors = {
        request: [],
        response: []
    };

    _executeHelper: {
        adapt?: boolean;
        setOptions?: boolean;
        setInterceptors?: boolean;
    } = {};

    constructor(options?: RequxtConfig) {
        if (options) {
            this.setOptions(options);
        }
    }

    /**
     * Set requxt options
     * 
     * 为请求实例设置选项
     */
    public setOptions(options: RequxtConfig): this {
        if (this._executeHelper.setOptions) return this;
        this._executeHelper.setOptions = true;

        this.options = options;
        if (this._executeHelper.adapt) {
            this.adapter?.applyOptions(this.options);
        }
        return this;
    }

    /**
     * Register middleware
     * 
     * 注册中间件
     */
    public use(middleware: Middleware): this {
        this.onion.use(middleware);
        return this;
    }

    /**
     * Use specific request adaptor
     * 
     * 使用特定方案的请求适配器
     */
    public adapt(ctor: AdapterConstructor): this {
        if (this._executeHelper.adapt) {
            console.warn('You can only instantiate one adapter on each instance');
            return this;
        }
        this._executeHelper.adapt = true;

        const adapter = this.adapter = new ctor(this);

        if (this.options) {
            adapter.applyOptions(this.options);
        }

        if (this._executeHelper.setInterceptors) {
            applyAllInterceptors(adapter, this.interceptors);
        }

        return this;
    }


    /**
     * Build requxt request instance
     * 
     * 构建 requxt 请求实例
     */
    public build(): RequxtInstance {
        const request: RequxtInstance = <T>(
            metadata: RequxtMetadata | RequxtOptions,
            data?: RequxtData | RequxtOptions,
            config?: RequxtConfig
        ) => {
            const options: RequxtOptions = {
                ...this.defaults,
                ...this.options,
                ...metadata,
                ...data,
                ...config
            };
            const final = this.onion.compose();
            const ctx = new Context(metadata, options);

            return new Promise((resolve, reject) => {
                final(ctx)
                    .then(() => {
                        if (ctx.error) {
                            return reject(ctx.error);
                        }
                        resolve(ctx.response as RequxtResponse<T>);
                    })
                    .catch(err => {
                        reject(err);
                    })
            }) as RequxtPromise<T>;
        };

        request.interceptors = useInterceptors(this);
        request.__requxtInstance = this;
        return request;
    }
}
