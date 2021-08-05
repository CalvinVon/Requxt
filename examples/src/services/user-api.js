import { Creators } from 'requxt-fetch';

const userApi = {
  list: Creators.GET('/user/list'),
  user: Creators.GET('/user/:id/detail?initOption=init'),
  xxxxx: {
    method: 'GET',
    url: '/api/detail'
  }
};

export {
  userApi
};
