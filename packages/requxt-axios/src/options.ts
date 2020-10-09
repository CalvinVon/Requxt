import { AxiosInstance } from "axios";
import { RequxtConfig } from "requxt";

const useOptions = (axios: AxiosInstance) => {
    return function applyOptions(options: RequxtConfig) {
        const {
            adapterOptions,
            mode,
            credentials,
            ...opt
        } = options;

        axios.defaults = {
            ...opt,
            ...adapterOptions,
        };
    };
};

export default useOptions;