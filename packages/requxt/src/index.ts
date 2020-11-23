import Requxt from "./core/requxt";
import Context from './core/Context';
import * as Creators from "./creators";
export * from './core/interceptor';
export * from "./core/utils";
export * from './types';

const instance = new Requxt();
const use = instance.use.bind(instance);
const setAdapter = instance.adapt.bind(instance);
const setOptions = instance.setOptions.bind(instance);
const request = instance.build();

export {
    Requxt,
    Context,
    Creators,
    request,
    use,
    setAdapter,
    setOptions,
};
