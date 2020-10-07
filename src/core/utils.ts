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
        setAdapter: ins.adapt.bind(ins),
    }
};

function mapper<T extends RequxtMetadataMapping>(request: RequxtInstance, metadatas: T): { [P in keyof T]: RequxtMappingInstance } {
    const mapping = <{ [P in keyof T]: RequxtMappingInstance }>{};
    for (const name in metadatas) {
        const metadata = metadatas[name];
        const mappingRequest = <K>(data?: RequxtData | RequxtOptions, config?: RequxtConfig) => {
            return request<K>(metadata, data, config);
        };
        mapping[name] = mappingRequest as RequxtMappingInstance;
        mapping[name].originRequest = request;
    }

    return mapping;
}

export {
    extend,
    mapper
};
