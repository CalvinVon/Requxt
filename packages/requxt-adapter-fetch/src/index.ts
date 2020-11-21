// https://www.cnblogs.com/fundebug/p/problems-of-fetch-and-solutions.html
import 'isomorphic-fetch';
import { AdapterInterface, Interceptors, Requxt, RequxtConfig } from 'requxt';
import applyCoreMiddleware from './middleware';
import { RequxtFetchConfig } from './types';

class FetchAdapter implements AdapterInterface {

    public globalRequxtOptions: RequxtFetchConfig = {};
    public interceptors: Interceptors = {
        request: [],
        response: []
    };

    constructor(requxt: Requxt) {
        requxt.onion.use(applyCoreMiddleware(this), { core: true });
    }

    applyOptions(options: RequxtConfig) {
        this.globalRequxtOptions = options;
    }

    applyInterceptors(interceptors: Interceptors) {
        this.interceptors = interceptors;
    }
}

export * from './abort-controller';
export * from './types';
export default FetchAdapter;
