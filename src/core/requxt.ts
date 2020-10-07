import Context from "./context";
import { Onion } from "./middleware";
import {
    Middleware,
    Adapter,
    RequxtInstance,
    RequxtOptions,
    RequxtMetadata,
    RequxtData,
    RequxtConfig,
    RequxtResponse,
    RequxtPromise,
    RequestInterceptor,
    ResponseInterceptor
} from "../types";
import { applyAllInterceptors as applyAllInterceptors, composeInterceptors, useInterceptors as useInterceptors } from "./interceptor";

export default class Requxt {
    onion: Onion = new Onion();
    options?: RequxtOptions;
    adapter?: Adapter;
    interceptors = {
        request: [] as RequestInterceptor[],
        response: [] as ResponseInterceptor[]
    };

    _executeHelper: {
        adapt?: boolean;
        setOptions?: boolean;
        setInterceptors?: boolean;
    } = {};

    constructor(options?: RequxtOptions) {
        if (options) {
            this.setOptions(options);
        }
    }

    public setOptions(options: RequxtOptions): this {
        if (this._executeHelper.setOptions) return this;
        this._executeHelper.setOptions = true;

        this.options = options;
        if (this._executeHelper.adapt) {
            this.adapter?.applyOptions(this.options);
        }
        return this;
    }

    public use(middleware: Middleware): this {
        this.onion.use(middleware);
        return this;
    }

    public adapt(adapter: Adapter): this {
        if (this._executeHelper.adapt) {
            console.warn('You can only use one adapter on each instance');
            return this;
        }
        this._executeHelper.adapt = true;

        adapter.applyOptions = (options) => {
            if (adapter._optionsApplied) return;

            adapter._optionsApplied = true;
            adapter.applyOptions.call(null, options);
        };
        
        adapter.call(null, this);
        if (this.options) {
            adapter.applyOptions(this.options);
        }

        if (this._executeHelper.setInterceptors) {
            applyAllInterceptors(adapter, this.interceptors);
        }
        this.adapter = adapter;
        return this;
    }

    public build(): RequxtInstance {
        const request: RequxtInstance = <T>(
            metadata: RequxtMetadata | RequxtOptions,
            data?: RequxtData | RequxtOptions,
            config?: RequxtConfig
        ) => {
            const options: RequxtOptions = {
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
        return request;
    }
}
