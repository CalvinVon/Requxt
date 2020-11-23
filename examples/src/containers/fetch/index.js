import React from 'react';
import { request } from 'requxt-fetch';
import '../../services/configureRequxt';
import UserApi from '../../services/user-api';

export default class FetchDemo extends React.Component {

  sendRequest = () => {
    request(UserApi.list, {
      params: {
        id: 998
      },
      query: {
        ts: Date.now()
      }
    }, {
      onDownloadProgress(e) {
        console.log(`downloading ${e.loaded} of ${e.total}`);
      },
      responseType: 'document'
      // timeout: 500
    })
      .then(res => {
        // console.log(res);
        console.log(res);
        console.log('success');
      })
      .catch(err => {
        console.log(err);
        console.log('failed');
      });
  }

  render() {
    return (
      <div>
        <h1>I am Fetch Demo</h1>
        <button onClick={this.sendRequest}>Send request</button>
      </div>
    )
  }
}
