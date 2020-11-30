import { extend as _extend, RequxtConfig, AdapterConstructor } from "requxt";
import FetchAdaptor from "requxt-adapter-fetch";
export * from 'requxt';

const extend = (options?: RequxtConfig, adapterCtor: AdapterConstructor = FetchAdaptor) => _extend(options, adapterCtor);
const { request, setAdapter, use, setOptions } = _extend();
setAdapter(FetchAdaptor);

export * from "requxt-adapter-fetch";
export {
    request,
    use,
    extend,
    setOptions
}
