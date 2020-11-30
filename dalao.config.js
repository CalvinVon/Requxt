module.exports = {
    "watch": true,
    "host": "localhost",
    "port": 7000,
    "target": "target.example.com",
    "changeOrigin": true,
    "headers": {
        response: {
            'Access-Control-Allow-Headers': 'x-by, X-Custom-Header'
        }
    },
    "proxyTable": {
        "/": {
            "path": "/",
            "changeOrigin": true,
            "target": "http://www.baidu.com",
            "pathRewrite": {}
        }
    },
    "cache": {
        "dirname": ".dalao-cache",
        "contentType": [
            "application/json"
        ],
        "maxAge": [
            0,
            "second"
        ],
        "filters": [
            {
                "when": "response",
                "where": "status",
                "field": null,
                "value": 200,
                "custom": null,
                "applyRoute": "*"
            }
        ],
        "logger": true
    },
    "mock": {
        "dirname": "mocks",
        "prefix": "",
        "cors": true,
        "enable": true
    },
    monitor: {
        enable: false
    }
};
