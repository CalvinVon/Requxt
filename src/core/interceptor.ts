import { Adapter, Interceptors, InterceptorApi, RequestInterceptor, ResponseInterceptor } from "../types";
import Requxt from "./requxt";

const noopRequestInterceptor: RequestInterceptor = (options: any) => ({ options });
const noopResponseInterceptor: ResponseInterceptor = (response: any, options: any) => ({ response, options });

/**
 * Add interceptor API for requxt instance
 * 
 * 为 requxt 实例添加拦截器 API
 */
export function useInterceptors(instance: Requxt) {
    const applyInterceptors = () => {
        instance._executeHelper.setInterceptors = true;
        const hasAdapt = instance._executeHelper.adapt;
        if (hasAdapt) {
            instance.adapter?.applyInterceptors(instance.interceptors);
        }
    };
    return {
        /**
         * Request interceptor
         * 
         * 请求拦截器
         */
        request: {
            use: (handler: RequestInterceptor) => {
                instance.interceptors.request.push(handler);
                applyInterceptors();
                return instance.interceptors.request.length;
            },
            eject: (id: number) => {
                const [handler] = instance.interceptors.request.splice(id - 1, 1);
                if (!handler) return;
                applyInterceptors();
            },
            ejectAll: () => {
                const former = instance.interceptors.request;
                instance.interceptors.request = [];
                applyInterceptors();
            }
        } as InterceptorApi,

        /**
         * Request interceptor
         * 
         * 请求拦截器
         */
        response: {
            use: (handler: ResponseInterceptor) => {
                instance.interceptors.response.push(handler);
                applyInterceptors();
                return instance.interceptors.response.length;
            },
            eject: (id: number) => {
                const [handler] = instance.interceptors.response.splice(id - 1, 1);
                if (!handler) return;
                applyInterceptors();
            },
            ejectAll: () => {
                const former = instance.interceptors.response;
                instance.interceptors.response = [];
                applyInterceptors();
            }
        } as InterceptorApi
    }
}


export function applyAllInterceptors(adapter: Adapter, interceptors: Interceptors) {
    const { request, response } = interceptors;
    request.forEach(it => adapter.applyInterceptors(interceptors));
    response.forEach(it => adapter.applyInterceptors(interceptors));
}


export function composeInterceptors(interceptors: Interceptors) {
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
        }, noopRequestInterceptor),
        response: resInterceptors.reduce((a, b) => (response, options) => {
            const brs = b(response, options);
            const ars = a(brs.response, brs.options);
            return {
                response: ars.response,
                options: ars.options
            };
        }, noopResponseInterceptor)
    }
}
