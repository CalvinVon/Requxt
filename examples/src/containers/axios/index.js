import React from 'react';
import Request from '../../components/Request';
import { userApi } from '../../services/user-api';
// import request from './configureRequxt';

export default class AxiosDemo extends React.Component {

  // sendRequest = () => {
  //   request.user()
  //     .then(res => {
  //       // console.log(res);
  //       console.log(res);
  //       console.log('success');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       console.log('failed');
  //     });
  // }

  render() {
    return (
      <Request
        adapter="axios"
        options={{
          baseURL: 'http://localhost:7000',
          headers: {
            'X-Custom-Header': 'Requxt extends axios'
          },
          onDownloadProgress(e) {
            console.log(e.total, e.loaded);
          }
        }}
        use={async (ctx, next) => {
          console.log('before');
          console.log(ctx);
          await next();
          ctx.response = ctx.response.data.data;
          console.log('after');
        }}

        metadata={userApi.user}
        data={{ params: { id: 998 }, query: 123 }}
      />
    );
  }
}
