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
    RequxtPromise
} from "../types";

export default class Requxt {
    options: RequxtOptions = {};
    onion: Onion = new Onion();
    adapter: Adapter | null = null;

    constructor(options?: RequxtOptions) {
        if (options) {
            this.setOptions(options);
        }
    }

    public setOptions(options: RequxtOptions) {
        this.options = options;
        if (this.adapter) {
            this.adapter.applyOptions(this.options);
        }
    }

    public use(middleware: Middleware) {
        this.onion.use(middleware);
        return this;
    }

    public adapt(adapter: Adapter) {
        if (adapter._adapted) return;
        adapter._adapted = true;
        this.adapter = adapter;
        adapter.call(null, this);
        return this;
    }

    public build(): RequxtInstance {
        function request<T>(
            this: Requxt,
            metadata: RequxtMetadata | RequxtOptions,
            data?: RequxtData | RequxtOptions,
            config?: RequxtConfig
        ) {
            const options: RequxtOptions = {
                ...this.options,
                ...metadata,
                ...data,
                ...config
            };
            const ctx = new Context(metadata, options);
            const final = this.onion.compose();

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

        return request.bind(this);
    }
}
