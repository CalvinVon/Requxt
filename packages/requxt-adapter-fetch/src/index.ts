// https://www.cnblogs.com/fundebug/p/problems-of-fetch-and-solutions.html
import 'isomorphic-fetch';
import { AdapterInterface, Interceptors, Requxt, RequxtOptions } from 'requxt';
import coreMiddleware from './middleware';
import applyOptions from './options';


class FetchAdapter implements AdapterInterface {

    public globalFetchOptions: RequestInit;

    constructor(requxt: Requxt) {
        requxt.onion.use(coreMiddleware, { core: true });
    }

    applyOptions(options: RequxtOptions) {
        this.globalFetchOptions = applyOptions(options);
    }

    applyInterceptors(interceptors: Interceptors) {

    }
}

export default FetchAdapter;
