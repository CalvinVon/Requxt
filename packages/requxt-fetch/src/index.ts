import { setAdapter, use, extend as _extend, RequxtConfig } from "requxt";
import FetchAdaptor from "requxt-adapter-fetch";
export * from 'requxt';

setAdapter(FetchAdaptor);
export const extend = (options?: RequxtConfig) => _extend(options, FetchAdaptor);

export * from "requxt-adapter-fetch";
