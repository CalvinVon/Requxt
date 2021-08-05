import { extend as _extend } from 'requxt-core';
import { AdapterConstructor } from 'requxt-core';
import { RequxtAdapter, RequxtOptions } from './interface';

function extend(options?: RequxtOptions) {
    const instance = _extend();
    const { request, use } = instance;
    let onReadyFn: undefined | (() => void);

    if (options) {
        setOptions(options);
    }

    function onReady(fn: () => void) {
        onReadyFn = fn;

        if (request.requxt.adapter) {
            onReadyFn();
        }
    }

    async function setOptions(options: RequxtOptions) {
        if (options.adapter) {
            await setAdapter(options.adapter);
            delete options.adapter;
        }
        instance.setOptions(options);
    }

    async function setAdapter(adapter: RequxtAdapter) {

        let adapterCtor: AdapterConstructor;
        switch (adapter) {
            case 'axios':
                adapterCtor = (await import(/* webpackChunkName: 'requxt__adapter-axios' */'requxt-adapter-axios')).default;
                break;

            case 'fetch':
                adapterCtor = (await import(/* webpackChunkName: 'requxt__adapter-fetch' */'requxt-adapter-fetch')).default;
                break;

            default:
                console.warn('[Requxt] No specific adapter found!');
                break;
        }

        if (adapterCtor!) {
            instance.setAdapter(adapterCtor);
            onReadyFn && onReadyFn();
        }
    }

    return {
        request,
        use,
        onReady,
        setOptions,
        setAdapter
    }
}

const {
    request,
    use,
    onReady,
    setOptions,
    setAdapter
} = extend();

export * from 'requxt-core';
export {
    extend,
    request,
    use,
    onReady,
    setOptions,
    setAdapter
}
