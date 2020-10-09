import { setAdapter } from "requxt";
import axiosAdaptor, {
    AxiosRequestConfig,
    AxiosResponse,
} from "requxt-adapter-axios";

setAdapter(axiosAdaptor);

export * from 'requxt';
export {
    AxiosRequestConfig,
    AxiosResponse,
}
