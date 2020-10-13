import { Context, Middleware, RequxtError } from "requxt";



function transformFetchConfig(context: Context): RequestInit {
    const { } = context.options;

    return {

    };
}


function transformFetchError(context: Context, error: any): RequxtError {
    return {
        isRequxtError: true,
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
        options: context.options,
        fullUrl: context.url,
    };
}


const coreMiddleware: Middleware = async (context: Context) => {
    const fetchConfig: RequestInit = transformFetchConfig(context);
    try {
        const res: Response = await fetch(context.url, fetchConfig);
    } catch (error) {
        context.error = transformFetchError(context, error);
    }
};

export default coreMiddleware;
