import { RequxtConfig } from "requxt-core";

export type RequxtAdapter = 'axios' | 'fetch';

export interface RequxtOptions extends RequxtConfig {
    adapter?: RequxtAdapter
}
