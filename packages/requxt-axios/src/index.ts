import { AdapterConstructor, extend as _extend, RequxtConfig } from "requxt";
import AxiosAdaptor, {
    AxiosRequestConfig,
    AxiosResponse,
    AbortController,
    AbortSignal
} from "requxt-adapter-axios";

const extend = (options?: RequxtConfig, adapterCtor: AdapterConstructor = AxiosAdaptor) => _extend(options, adapterCtor);
const { request, setAdapter, use } = _extend();
setAdapter(AxiosAdaptor);

export * from 'requxt';
export {
    AxiosRequestConfig,
    AxiosResponse,
    AbortController,
    AbortSignal,
    request,
    use,
    extend
}
