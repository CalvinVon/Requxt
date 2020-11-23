import { AxiosInstance, AxiosRequestConfig } from "axios";
import { RequxtConfig } from "requxt";

const applyOptions = (axios: AxiosInstance, options: RequxtConfig<AxiosRequestConfig>) => {
    const {
        adapterOptions,
        ...opt
    } = options;

    axios.defaults = {
        ...opt,
        ...adapterOptions,
    } as AxiosRequestConfig;
};

export default applyOptions;
