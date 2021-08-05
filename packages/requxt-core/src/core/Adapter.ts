import { Interceptors, Middleware, Requxt, RequxtConfig } from "..";

export class AdapterAPI {
    public adapter!: Adapter;
    constructor(private requxt: Requxt) { }

    connect(adapter: Adapter) {
        this.adapter = adapter;
    }

    /**
     * Add adapter middlewares
     */
    use(middleware: Middleware) {
        this.requxt.onion.use(middleware, { core: true });
    }
}

/**
 * You should create your own adapter class extends the `Adapter` class and implement
 * the `run` method.
 * 
 * An adapter should apply instance options and interceptors to core request,
 * and implements core middleware(s).
 * 
 * 编写适配器应继承 `Adapter` 类并实现 `run` 方法
 * 
 * 适配器应将实例选项和拦截器应用于核心请求，并实现核心中间件
 */
export abstract class Adapter {
    public options: RequxtConfig = {};
    public interceptors: Interceptors = {
        request: [],
        response: []
    };

    constructor(public api: AdapterAPI) {
        this.api.connect(this);
        this.run(api);
    }

    /**
     * @attention DO NOT implement
     */
    setInterceptors(interceptors: Interceptors) {
        this.interceptors = interceptors;
        this.applyInterceptors(interceptors);
    }

    /**
     * @attention DO NOT implement
     */
    setOptions(options: RequxtConfig) {
        this.options = options;
        this.applyOptions(options);
    }
    

    

    /**
     * Adapter should implement `run` method.
     * 
     * 适配器应实现 `run` 方法
     */
    run(api: AdapterAPI) { }

    /**
     * Apply interceptors to adapter
     * 
     * 将拦截器应用于适配器
     */
    applyInterceptors(interceptors: Interceptors) { }

    /**
     * Apply requxt options to the adapter
     * 
     * 将选项应用于适配器
     */
    applyOptions(options: RequxtConfig) { }
};

export interface AdapterConstructor {
    new(api: AdapterAPI): Adapter;
}