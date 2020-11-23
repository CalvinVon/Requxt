import React from 'react';
import '../../services/configureRequxt';
import request from '../../services/user-api';



export default class FetchDemo extends React.Component {

  sendRequest = () => {
    request.user({ params: { id: 998 } })
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
