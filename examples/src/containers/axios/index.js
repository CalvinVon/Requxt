import React from 'react';
import request from './configureRequxt';


export default class AxiosDemo extends React.Component {

  sendRequest = () => {
    request.user({ params: { id: 998 }, query: 123 })
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
        <h1>I am axios Demo</h1>
        <button onClick={this.sendRequest}>Send request</button>
      </div>
    )
  }
}
