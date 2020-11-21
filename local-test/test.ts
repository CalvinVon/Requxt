import {
    AbortController,
    Creators,
    extend,
    FetchInterceptorOptions,
    request,
    setOptions,
    use
} from 'requxt-fetch';

// use(async (context, next) => {
//     console.log('m1 start');
//     try {
//         await next();
//     } catch (error) {
//         console.log('error in middleware handler');
//         console.log(error.message);
//     }
//     console.log('m1 end');
// });
use(async (context, next) => {
    console.log('m2 start');
    context.ts = 'ds';
    // context.options.url = '/api';
    context.query
    context.data
    context.metadata.aaa = 'post';
    // context.options = { method: 'PUT', url: '/api/options' };
    context.url
    await next();
    console.log('m2 end');
});

// use(async (context, next) => {
//     context.metadata;
//     await next();
// });
// use(errorHandler);


setOptions({
    headers: { 'x-c': 'calvin' },
    baseURL: 'http://localhost:7000'
});


const API = {
    user: Creators.GET('/user/:id/detail'),
};

request.interceptors.request.use(async (options: FetchInterceptorOptions) => {
    console.log('request interceptor 1');
    // options.url += '/i0';
    await 1;
    console.log('fake await request interceptor 1')
    return {
        options
    }
});

request.interceptors.request.use(async (options: FetchInterceptorOptions) => {
    console.log('request interceptor 2');
    // options.url += '/i1';
    return {
        options
    }
});

request.interceptors.request.use((options: FetchInterceptorOptions) => {
    console.log('request interceptor 3');
    // options.url += '/i1';
    return {
        options
    }
});
request.interceptors.response.use((res: Response, options: FetchInterceptorOptions) => {
    console.log('response interceptor 1');
    options;
    res;
    return {
        options,
        response: res
    }
});
request.interceptors.response.use(async (res: Response, options: FetchInterceptorOptions) => {
    console.log('response interceptor 2');
    options;
    const clone = res.clone();
    const resp = await res.json();
    if (resp.data.code !== 200) {
        throw new Error('不是200！');
    }
    return {
        options,
        response: clone
    }
});

const controller = new AbortController();
// setTimeout(() => {
//     controller.abort();
// }, 100);

const res = request<{ a: string }>(
    API.user,
    {
        body: { ok: 1 },
        query: { a: 2 },
        params: { id: 998 }
    },
    {
        signal: controller.signal
    }
);

// request(
//     API.user,
//     {
//         body: { ok: 1 },
//         query: { a: 2 },
//         params: { id: 998 }
//     }
// );


res
    .then(res => {
        // console.log(res);
        console.log('success');
        console.log(res);
    })
    .catch(err => {
        console.log(err);
        console.log('failed');
    })


const instance = extend();
instance.use(async (ctx, next) => {
    console.log('I am instance 2!');
    await next();
});
instance.request({
    method: 'GET',
    url: 'http://localhost:7000/user/998/detail'
}).then(res => console.log(res))



// interface User {
//     id: number;
//     name: string;
// }

// const req = mapper(request, API);
// req.user({ body: { body: 'body' }, params: { id: '998' } }, { headers: { 'x-cus': 'tom' } })
//     .then(res => {
//         console.log(res);
//     })
//     .catch(error => {
//         console.log(error);
//     })

// request(API.name, /**opts */);
