import {
    RequxtMetadataMapping,
    RequxtInstance,
    RequxtMappingInstance,
    RequxtOptions,
    RequxtConfig,
    RequxtData
} from "../types";
import Requxt from "./requxt";

const extend = (options?: RequxtOptions) => {
    const ins = new Requxt(options);
    return {
        request: ins.build(),
        use: ins.use.bind(ins),
        adapter: ins.adapt.bind(ins),
    }
};

function mapper<T extends RequxtMetadataMapping, K>(request: RequxtInstance<K>, metadatas: T): { [P in keyof T]: RequxtMappingInstance } {
    const mapping = <{ [P in keyof T]: RequxtMappingInstance }>{};
    for (const name in metadatas) {
        const metadata = metadatas[name];
        mapping[name] = (data?: RequxtData | RequxtOptions, config?: RequxtConfig) => {
            return request(metadata, data, config);
        };
    }

    return mapping;
}

export {
    extend,
    mapper
};
