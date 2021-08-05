import { extend as _extend, RequxtConfig } from "requxt-core";
import FetchAdaptor from "requxt-adapter-fetch";
import { AdapterConstructor } from "requxt-core";

const extend = (options?: RequxtConfig, adapterCtor: AdapterConstructor = FetchAdaptor) => _extend(options, adapterCtor);
const { request, setAdapter, use, setOptions } = _extend();
setAdapter(FetchAdaptor);

export * from "requxt-core";
export * from "requxt-adapter-fetch";
export {
    request,
    use,
    extend,
    setOptions
}
