import { Creators } from 'requxt-fetch';

const APIs = {
  list: Creators.GET('/user/list'),
  user: Creators.GET('/user/:id/detail?initOption=init'),
};

export default APIs;
