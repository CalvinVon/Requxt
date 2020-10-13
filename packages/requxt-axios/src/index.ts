import { setAdapter } from "requxt";
import AxiosAdaptor, {
    AxiosRequestConfig,
    AxiosResponse,
    AbortController,
    AbortSignal
} from "requxt-adapter-axios";

setAdapter(AxiosAdaptor);

export * from 'requxt';
export {
    AxiosRequestConfig,
    AxiosResponse,
    AbortController,
    AbortSignal
}
