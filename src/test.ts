import { adapter, use, request, mapper, RequxtMetadata, extend, setOptions, RequxtError, RequxtMetadataMapping } from ".";
import { GET } from "./helper";
import axiosAdaptor from './adapters/axios';
import errorHandler from './middlewares/response-error-handler';

adapter(axiosAdaptor);
use(async (context, next) => {
    console.log('m1 start');
    try {
        await next();
    } catch (error) {
        console.log('error in middleware handler');
        console.log(error.message);
    }
    console.log('m1 end');
});
use(async (context, next) => {
    console.log('m2 start');
    context;
    await next();
    console.log('m2 end');
});

// use(async (context, next) => {
//     await next();

//     if (context.response?.data.code !== 200) {
//         throw new Error('biz failed with code ' + context.response?.data.code);
//     }
// });
// use(errorHandler);


setOptions({
    headers: { 'x-c': 'calvin' },
    baseURL: 'http://localhost:7000'
});


request({
    method: 'get',
    url: '/user/:id/detail',
    headers: {}
}).then(res => {
    res.data
})

const API = {
    user: GET('/user/:id/detail')
};



const res = request(
    API.user,
    {
        body: { ok: 1 },
        query: { a: 2 },
        params: { id: 998 }
    }
);


res
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        ;
        console.log(err);
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

const req = mapper(request, API);
req.user({ body: { body: 'body' }, params: { id: '998' } }, { headers: { 'x-cus': 'tom' } })
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })

// request(API.name, /**opts */);
