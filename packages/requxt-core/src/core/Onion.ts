import { Middleware, FinalMiddleware } from "../types";
import { compose } from "./compose";

export default class Onion {
    /** middlewares for user */
    private middlewares: Middleware[] = [];
    /** middlewares for adapter */
    private cores: Middleware[] = [];

    public use(middleware: Middleware, options?: { core?: boolean }) {
        const { core } = options || {};

        if (core) {
            this.cores.push(middleware);
        }
        else {
            this.middlewares.push(middleware);
        }
        return this;
    }

    /**
     * Clean core middlewares.
     * 
     * Adapters add middlewares in `cores` array,
     * clean core middlewares to set another adapter.
     */
    public cleanCoreMiddlewares() {
        this.cores = [];
    }

    public compose(): FinalMiddleware {
        return compose([
            ...this.middlewares,
            ...this.cores
        ]);
    }
}

