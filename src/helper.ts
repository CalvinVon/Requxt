import { Method, MetadataCreator, PlainObject } from ".";

const metadataMethodCreator = (method: Method): MetadataCreator =>
    (url: string, fields?: PlainObject) => ({ method, url, ...fields });

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
