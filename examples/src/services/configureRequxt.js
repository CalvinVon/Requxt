// import { request, setOptions, use } from 'requxt-axios';
import { request, setOptions, use } from 'requxt-fetch';

setOptions({
  baseURL: 'http://localhost:7000',
  // headers: {
  //     'X-Custom-Header': 'Requxt example demo'
  // }
});


use(async (ctx, next) => {
  ctx.query.ts = Date.now();
  await next();
  try {
    ctx.response = ctx.response.data.data;
  } catch (error) {

  }
});

request.interceptors.request.use((options) => {

  console.log(options);
  return {
    options
  }
});

