import { Middleware } from "../types";

const responseErrorHandler: Middleware = async (ctx, next) => {
    ctx.params = {
        id: 110
    };
    ctx.query = {
        ...ctx.query,
        ts: Date.now()
    };

    await next();
};

export default responseErrorHandler;