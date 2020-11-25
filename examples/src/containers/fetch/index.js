import React from 'react';
import request from './configureRequxt';

export default class FetchDemo extends React.Component {

  sendRequest = () => {
    request.user({ params: { id: 998 } }, { headers: { 'x-by': 'fetch' } })
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
