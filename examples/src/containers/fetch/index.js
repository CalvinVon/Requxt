import React from 'react';
import { request } from 'requxt-fetch';
import '../../services/configureRequxt';
import UserApi from '../../services/user-api';

export default class FetchDemo extends React.Component {

  sendRequest = () => {
    request(UserApi.list, {
      query: {
        ts: Date.now()
      }
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