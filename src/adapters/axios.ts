import { Middleware, Adapter, RequxtResponse } from "../types";
import Context from "../core/context";
import Requxt from "../core/requxt";
import axios from 'axios';


const coreMiddleware: Middleware = async (context: Context) => {
    return axios({
        url: context.url,
        method: context.method,
        data: context.body,
        params: context.query
    })
        .then(response => {
            context.response = {
                ...response,
                options: context.options
            };
        })
        .catch(err => {
            context.response = err;
        });
};

const adapter: Adapter = (requxt: Requxt) => {
    const options = requxt.options;
    axios.defaults.baseURL = options.baseURL;
    axios.defaults.headers = options.headers;
    axios.defaults.responseType = options.responseType;
    requxt.onion.use(coreMiddleware, { core: true });
};

export default adapter;