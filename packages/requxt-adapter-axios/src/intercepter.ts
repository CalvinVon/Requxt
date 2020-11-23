import { composeInterceptors, Interceptors } from "requxt";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
    handlers: {
        fulfilled: (value: V) => V | Promise<V>;
        onRejected: (error: any) => any;
    }[]
}

const applyIntercepter = (axios: AxiosInstance, interceptors: Interceptors) => {
    const {
        request: composedRequestInterceptor,
        response: composedResponseInterceptor
    } = composeInterceptors(interceptors);

    const requestInterceptor = async (config: AxiosRequestConfig) => {
        let options;
        try {
            options = await composedRequestInterceptor<AxiosRequestConfig>(config);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
        return options.options;
    };

    const responseInterceptor = async (response: AxiosResponse) => {
        let res = response;
        let options = response.config;

        try {
            const result = await composedResponseInterceptor<AxiosRequestConfig, AxiosResponse>(res, options);
            res = result.response;
            options = result.options;

            res.config = options;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }

        return res;
    };
    (axios.interceptors.request as AxiosInterceptorManager<AxiosRequestConfig>).handlers = [
        {
            fulfilled: requestInterceptor,
            onRejected: requestInterceptor
        }
    ];
    (axios.interceptors.response as AxiosInterceptorManager<AxiosResponse>).handlers = [
        {
            fulfilled: responseInterceptor,
            onRejected: responseInterceptor
        }
    ];
};

export default applyIntercepter;
export {
    AxiosRequestConfig, AxiosResponse
};
