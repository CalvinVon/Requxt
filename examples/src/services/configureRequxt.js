import { request, setOptions, use } from 'requxt-axios';
// import { request, setOptions, use } from 'requxt-fetch';

setOptions({
    baseURL: 'http://localhost:7000',
    // headers: {
    //     'X-Custom-Header': 'Requxt example demo'
    // }
});


use(async (ctx, next) => {
    if (ctx.query) {
        ctx.query.ts = Date.now();
    }
    else {
        ctx.data = {
            ...ctx.data,
            query: {
                ts: Date.now()
            },
        }
    }

    await next();
    ctx.response = ctx.response.data.data;
});

request.interceptors.request.use((options) => {

    console.log(options);
    return {
        options
    }
});

