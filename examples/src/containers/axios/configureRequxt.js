import { mapper, request, setOptions, use } from 'requxt-axios';
import { userApi } from '../../services/user-api';

setOptions({
  baseURL: 'http://localhost:7000',
  headers: {
    'X-Custom-Header': 'Requxt extends axios'
  }
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

request.interceptors.response.use((response, options) => {

  console.log({
    response,
    options
  });
  return {
    response,
    options
  };
});

export default mapper(request, userApi);