import { Middleware, FinalMiddleware } from "../types";
import { compose } from "./compose";

export default class Onion {
    middlewares: Middleware[] = [];
    coreMiddlewares: Middleware[] = [];

    public use(middleware: Middleware, options?: { core: boolean }) {
        const { core } = options || {};

        if (core) {
            this.coreMiddlewares.push(middleware);
        }
        else {
            this.middlewares.push(middleware);
        }
        return this;
    }

    public compose(): FinalMiddleware {
        return compose([
            ...this.middlewares,
            ...this.coreMiddlewares
        ]);
    }
}

