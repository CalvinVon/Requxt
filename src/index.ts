import { useInterceptors } from "./core/interceptor";
import Requxt from "./core/requxt";
export * from "./core/utils";
export * from './types';

const instance = new Requxt();
const use = instance.use.bind(instance);
const setAdapter = instance.adapt.bind(instance);
const setOptions = instance.setOptions.bind(instance);
const request = instance.build();

export {
    request,
    use,
    setAdapter,
    setOptions
};
