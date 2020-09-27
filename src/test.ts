import { adapter, use, request, mapper, RequxtMetadata, extend, setOptions, RequxtError } from ".";
import axiosAdaptor from './adapters/axios';
import errorHandler from './middlewares/response-error-handler';

adapter(axiosAdaptor);
// use(async (context, next) => {
//     console.log('m1 start');
//     try {
//         await next();
//     } catch (error) {
//         console.log('handler error in outer middleware');
//         console.log(error.message);
//     }
//     console.log('m1 end');
// });
use(async (context, next) => {
    console.log('m2 start');
    await next();
    // context.error = context.error?.response as unknown as RequxtError;
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

const API = {
    user: {
        url: '/user/:id/detail',
        method: 'get',
    } as RequxtMetadata,
    name: {
        url: '',
        method: 'get'
    } as RequxtMetadata,
};


const res = request(
    API.user,
    {
        body: { ok: 1 },
        query: { a: 2 },
        params: { id: 998 }
    }
);
// const res = request(API.user, { params: { id: 110 }, headers: {} });
// const res = request({ params: { id: '007' }, headers: {} });


res
    .then(res => {
        console.log(res);
    })
    .catch(err => {;
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

// const req = mapper(request, API);
// req.name()

// request(API.name, /**opts */);
