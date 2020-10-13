import { setAdapter } from "requxt";
import axiosAdaptor, {
    AxiosRequestConfig,
    AxiosResponse,
    AbortController,
    AbortSignal
} from "requxt-adapter-axios";

setAdapter(axiosAdaptor);

export * from 'requxt';
export {
    AxiosRequestConfig,
    AxiosResponse,
    AbortController,
    AbortSignal
}
