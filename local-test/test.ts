import { AbortController, AxiosRequestConfig, AxiosResponse, Creators, request, setOptions, use } from 'requxt-axios';

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

request.interceptors.request.use((options: AxiosRequestConfig) => {
    console.log('request interceptor 1');
    // options.url += '/i0';
    return {
        options
    }
});

request.interceptors.request.use((options: AxiosRequestConfig) => {
    console.log('request interceptor 2');
    // options.url += '/i1';
    return {
        options
    }
});

request.interceptors.request.use((options: AxiosRequestConfig) => {
    console.log('request interceptor 3');
    // options.url += '/i1';
    return {
        options
    }
});
request.interceptors.response.use((res: AxiosResponse, options: AxiosRequestConfig) => {
    console.log('response interceptor 1');
    options;
    res;
    return {
        options,
        response: res
    }
});
request.interceptors.response.use((res: AxiosResponse, options: AxiosRequestConfig) => {
    console.log('response interceptor 2');
    options;
    res;
    if (res.data.code !== 200) {
        throw new Error('不是200！');
    }
    return {
        options,
        response: res
    }
});

const controller = new AbortController();
setTimeout(() => {
    controller.abort();
}, 100);

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
    })
    .catch(err => {
        console.log(err);
        console.log('failed');
    })


// const instance = extend();
// instance.use(async (ctx, next) => {
//     console.log('I am instance 2!');
//     await next();
// });
// instance.adapter(axiosAdaptor);
// instance.request({
//     method: 'GET',
//     url: ''
// }).then(res => console.log(res))



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
