import { adapter, use, request, mapper, RequxtMetadata, extend } from ".";
import axiosAdaptor from './adapters/axios';
import errorHandler from './middlewares/response-error-handler';

adapter(axiosAdaptor);
use(async (context, next) => {
    console.log('m1 start');
    await next();
    console.log('m1 end');
});
use(async (context, next) => {
    console.log('m2 start');
    await next();
    console.log('m2 end');
});
use(errorHandler);


const API = {
    user: {
        url: '/user/:id/detail',
        method: 'get'
    } as RequxtMetadata,
    name: {
        url: '',
        method: 'get'
    } as RequxtMetadata,
};

// request(API.user, {
//     body: {},

// })
//     .then(res => console.log(res))
//     .catch(err => null)

const res = request(API.user, { body: {}, query: { a: 1 }, params: { id: 998 } }, { headers: { 'x-c': 'calvin' } });
// const res = request(API.user, { params: { id: 110 }, headers: {} });
// const res = request({ params: { id: '007' }, headers: {} });

res.then(console.log, console.log)

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



interface User {
    id: number;
    name: string;
}

// const req = mapper(request, API);
// req.name()

// request(API.name, /**opts */);
