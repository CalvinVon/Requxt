import { Adapter, Requxt } from "requxt";
import axios from 'axios';
import useIntercepter from "./intercepter";
import useMiddleware from "./middleware";
import useOptions from "./options";

const coreMiddleware = useMiddleware(axios);
const adapter: Adapter = (requxt: Requxt) => {
    requxt.onion.use(coreMiddleware, { core: true });
};

adapter.applyInterceptors = useIntercepter(axios);
adapter.applyOptions = useOptions(axios);

export * from './intercepter';
export * from './abort-controller';
export * from 'axios';
export default adapter;
