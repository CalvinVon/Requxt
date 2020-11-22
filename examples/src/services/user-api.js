import { Creators } from 'requxt-fetch';

const APIs = {
    list: Creators.GET('/user/list'),
    detail: Creators.GET('/user/:id'),
};

export default APIs;