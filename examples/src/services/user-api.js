import { Creators, mapper, request } from 'requxt-fetch';

const userApi = {
  list: Creators.GET('/user/list'),
  user: Creators.GET('/user/:id/detail?initOption=init'),
};

const req = mapper(request, userApi);
export default req;

export {
  userApi
};
