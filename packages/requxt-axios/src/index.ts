import { extend as _extend, RequxtConfig } from "requxt-core";
import AxiosAdaptor, {
    AxiosRequestConfig,
    AxiosResponse,
    AbortController,
    AbortSignal
} from "requxt-adapter-axios";
import { AdapterConstructor } from "requxt-core";

const extend = (options?: RequxtConfig, adapterCtor: AdapterConstructor = AxiosAdaptor) => _extend(options, adapterCtor);
const { request, setAdapter, use, setOptions } = _extend();
setAdapter(AxiosAdaptor);

export * from "requxt-core";
export {
    AxiosRequestConfig,
    AxiosResponse,
    AbortController,
    AbortSignal,
    request,
    use,
    extend,
    setOptions
}
