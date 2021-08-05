import { Interceptors } from "requxt-core";
import axios, { AxiosInstance } from 'axios';
import applyIntercepter from "./intercepter";
import applyMiddleware from "./middleware";
import { Adapter, AdapterAPI } from "requxt-core";

class AxiosAdapter extends Adapter {
    public axios!: AxiosInstance;

    run(api: AdapterAPI) {
        const axiosInstance = this.axios = axios.create();
        const coreMiddleware = applyMiddleware(axiosInstance);

        api.use(coreMiddleware);
    }

    applyInterceptors(interceptors: Interceptors) {
        applyIntercepter(this.axios, interceptors);
    }
}


export * from './intercepter';
export * from './abort';
export * from 'axios';
export default AxiosAdapter;
