import { Adapter, Interceptors, InterceptorApi, RequestInterceptor, ResponseInterceptor } from "../types";
import Requxt from "./requxt";

export function useInterceptors(instance: Requxt) {
    const adapter = instance.adapter;
    const setFlag = () => {
        instance._executeHelper.setInterceptors = true;
        const hasAdapt = instance._executeHelper.adapt;
        return hasAdapt;
    };
    return {
        request: {
            use: (handler: RequestInterceptor) => {
                instance.interceptors.request.push(handler);
                setFlag() && adapter?.applyInterceptors(instance.interceptors);
                return instance.interceptors.request.length;
            },
            eject: (id: number) => {
                const [handler] = instance.interceptors.request.splice(id - 1, 1);
                if (!handler) return;
                setFlag() && adapter?.applyInterceptors(instance.interceptors);
            },
            ejectAll: () => {
                const former = instance.interceptors.request;
                instance.interceptors.request = [];
                setFlag() && former.forEach(it => {
                    adapter?.applyInterceptors(instance.interceptors);
                });
            }
        } as InterceptorApi,
        response: {
            use: (handler: ResponseInterceptor) => {
                instance.interceptors.response.push(handler);
                setFlag() && adapter?.applyInterceptors(instance.interceptors);
                return instance.interceptors.response.length;
            },
            eject: (id: number) => {
                const [handler] = instance.interceptors.response.splice(id - 1, 1);
                if (!handler) return;
                setFlag() && adapter?.applyInterceptors(instance.interceptors);
            },
            ejectAll: () => {
                const former = instance.interceptors.response;
                instance.interceptors.response = [];
                setFlag() && former.forEach(it => {
                    adapter?.applyInterceptors(instance.interceptors);
                });
            }
        } as InterceptorApi
    }
}


export function applyAllInterceptors(adapter: Adapter, interceptors: Interceptors) {
    const { request, response } = interceptors;
    request.forEach(it => adapter.applyInterceptors(interceptors));
    response.forEach(it => adapter.applyInterceptors(interceptors));
}


export function composeInterceptors<T, K, P>(interceptors: Interceptors) {
    const { request, response } = interceptors;
    const reqInterceptors = [...request].reverse();
    const resInterceptors = [...response].reverse();
    return {
        request: reqInterceptors.reduce((a, b) => options => {
            const brs = b(options);
            const ars = a(brs.options);
            return {
                options: ars.options
            };
        }),
        response: resInterceptors.reduce((a, b) => (response, options) => {
            const brs = b(response, options);
            const ars = a(brs.response, brs.options);
            return {
                response: ars.response,
                options: ars.options
            };
        })
    }
}
