import React, { useEffect, useMemo, useState } from 'react';
import { extend } from 'requxt';

export default function Request(props) {
  const { request, use, setOptions, setAdapter } = useMemo(extend, []);

  const {
    supportSwitch,
    adapter: initialAdapter,
    options: rOptions,
    use: rUse,
    intercepter: rIntercepter,
    onRequest,

    // requxt data
    metadata,
    data,
    config,
  } = props;

  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adapter, switchAdapter] = useState(initialAdapter || 'fetch');

  useEffect(() => {
    // configure requxt
    setOptions({
      ...rOptions,
      adapter
    });
    use(rUse);
  }, []);

  useEffect(() => {
    setAdapter(adapter)
      .then(() => {
        console.log(request.requxt);
        console.log(request.requxt.adapter);
      });
  }, [adapter]);


  const sendRequest = async () => {
    setLoading(true);
    onRequest && onRequest();
    const resp = await request(metadata, data, config);
    setRes(resp);
    setLoading(false);
  };

  return (
    <div>
      <h1>{adapter} Demo</h1>
      <button onClick={sendRequest}>Send request</button>

      <br />

      {
        supportSwitch && (
          <button
            onClick={() => {
              switchAdapter(adapter === 'axios' ? 'fetch' : 'axios');
            }}>Switch adapter(current: {adapter})
          </button>
        )
      }

      {
        loading && (
          <p>Sending request...</p>
        )
      }

      {
        res && !loading && (
          <pre>
            <h3>Response:</h3>
            <code>{JSON.stringify(res, null, 4)}</code>
          </pre>
        )
      }
    </div>
  );
};
