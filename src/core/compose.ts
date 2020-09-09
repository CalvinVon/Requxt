import { Middleware, FinalMiddleware, NextMiddleware } from "../types";
import Context from "./context";

export function compose(middlewares: Middleware[]): FinalMiddleware {
    return function (context: Context, next?: NextMiddleware) {
        let index = -1;

        function dispatch(i: number): Promise<any> {
            if (i <= index) {
                return Promise.reject(new Error('next() called multiple times'));
            }

            index = i;
            let fn = middlewares[i] || next;

            if (!fn) {
                return Promise.resolve();
            }

            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return dispatch(0);
    };
}
