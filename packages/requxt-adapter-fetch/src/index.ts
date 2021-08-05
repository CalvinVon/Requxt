// https://www.cnblogs.com/fundebug/p/problems-of-fetch-and-solutions.html
import 'isomorphic-fetch';
import { Adapter, AdapterAPI } from 'requxt-core';
import applyCoreMiddleware from './middleware';

class FetchAdapter extends Adapter {
    run(api: AdapterAPI) {
        api.use(applyCoreMiddleware(this));
    }
}

export * from './abort';
export * from './types';
export default FetchAdapter;
