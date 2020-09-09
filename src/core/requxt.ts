import Context from "./context";
import { Onion } from "./middleware";
import { Middleware, Adapter, RequxtInstance, RequxtOptions, RequxtMetadata, RequxtData, RequxtConfig } from "../types";

export default class Requxt {
    options: RequxtOptions = {};
    onion: Onion = new Onion();

    constructor(options?: RequxtOptions) {
        if (options) {
            this.setOptions(options);
        }
    }

    public setOptions(options: RequxtOptions) {
        this.options = options;
    }

    public use(middleware: Middleware) {
        this.onion.use(middleware);
        return this;
    }

    public adapt(adaptor: Adapter) {
        if (adaptor._adapted) return;
        adaptor._adapted = true;
        adaptor.call(null, this);
        return this;
    }

    public build(): RequxtInstance {
        return (
            metadata: RequxtMetadata | RequxtOptions,
            data?: RequxtData | RequxtOptions,
            config?: RequxtConfig
        ) => {
            const options: RequxtOptions = {
                ...metadata,
                ...data,
                ...config
            };
            const ctx = new Context(metadata, options);
            const final = this.onion.compose();
            return final(ctx)
                .then(() => {
                    return ctx.response;
                })
                .catch(err => {
                    throw ctx.response;
                })
        };
    }

}