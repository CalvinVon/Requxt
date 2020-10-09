import { MetadataCreator, Method, PlainObject, RequxtMetadata } from "./types";

const metadataMethodCreator = (method: Method): MetadataCreator =>
    (urlOrMetadata: RequxtMetadata | string, fields?: PlainObject) => {
        if (typeof urlOrMetadata === 'string') {
            return { method, url: urlOrMetadata, ...fields };
        }
        else {
            return { ...urlOrMetadata, method };
        }
    };

export const GET = metadataMethodCreator('GET');
export const POST = metadataMethodCreator('POST');
export const PATCH = metadataMethodCreator('PATCH');
export const PUT = metadataMethodCreator('PUT');
export const DELETE = metadataMethodCreator('DELETE');
export const HEAD = metadataMethodCreator('HEAD');
export const PURGE = metadataMethodCreator('PURGE');
export const LINK = metadataMethodCreator('LINK');
export const UNLINK = metadataMethodCreator('UNLINK');
export const OPTIONS = metadataMethodCreator('OPTIONS');
