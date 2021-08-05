import { useEffect, useState } from "react";
import { request, mapper, onReady, use, setAdapter } from "requxt";
import Request from "../../components/Request";
import { userApi } from '../../services/user-api';

const reqs = mapper(request, userApi);


export default function SwtichDemo(props) {
  const [id, setId] = useState(1);

  useEffect(() => {
    setAdapter('fetch');
    onReady(() => {
      console.log('I am ready')
      reqs.user({
        params: { id: 998 },
        query: {
          ts: Date.now()
        }
      }, { baseURL: 'http://localhost:7000' })
        .then(res => {
          console.log({ res });
        });
    })

    use(async (ctx, next) => {
      console.log('mmmmm');
      await next();
      ctx.response = ctx.response.data.data;
    });

    // request.interceptors.request.use((options) => {
    //   console.log(options);

    //   return {
    //     options
    //   }
    // });

    request.interceptors.response.use((response, options) => {
      console.log(response, options);

      return {
        response,
        options
      }
    });


  }, []);

  return (
    <>
      <Request
        adapter="fetch"
        supportSwitch
        options={{
          baseURL: 'http://localhost:7000',
          headers: {
            'x-custom-header': 'support switch',
          }
        }}
        use={async (ctx, next) => {
          console.log('==before');
          console.log(ctx);
          await next();
          // if (ctx.response.data) {
          //   ctx.response = ctx.response.data.data;
          // }
          console.log('==after');
        }}

        metadata={userApi.user}
        data={{ params: { id: 998 }, query: 123 }}
        config={{
          headers: {
            'x-config-id': id
          }
        }}

        onRequest={() => {
          setId(id + 1);
        }}
      />

      <Request
        adapter="axios"
        options={{
          baseURL: 'http://localhost:7000',
        }}
        use={async (ctx, next) => {
          await next();
          if (ctx.response && ctx.response.data) {
            ctx.response = ctx.response.data.data;
          }
        }}

        metadata={userApi.user}
        data={{ params: { id: 998 }, query: 'xxx' }}
      />

      <Request
        adapter="fetch"
        options={{
          baseURL: 'http://localhost:7000',
        }}
        use={async (ctx, next) => {
          await next();
          if (ctx.response && ctx.response.data) {
            ctx.response = ctx.response.data.data;
          }
        }}

        metadata={userApi.user}
        data={{ params: { id: 998 }, query: 'xxx' }}
      />
    </>
  )
}
