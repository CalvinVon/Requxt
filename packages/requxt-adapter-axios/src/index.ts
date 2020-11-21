import { AdapterInterface, Interceptors, Requxt, RequxtConfig } from "requxt";
import axios from 'axios';
import applyIntercepter from "./intercepter";
import applyMiddleware from "./middleware";
import applyOptions from "./options";

class AxiosAdapter implements AdapterInterface {
    constructor(requxt: Requxt) {
        const coreMiddleware = applyMiddleware(axios);
        requxt.onion.use(coreMiddleware, { core: true });
    };
    applyInterceptors(interceptors: Interceptors) {
        applyIntercepter(axios, interceptors);
    }
    applyOptions(options: RequxtConfig) {
        applyOptions(axios, options);
    }
}


export * from './intercepter';
export * from './abort-controller';
export * from 'axios';
export default AxiosAdapter;
