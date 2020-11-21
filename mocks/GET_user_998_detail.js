const data = {
    "CACHE_INFO": "Mocked by Dalao-Proxy Plugin Cache",
    "CACHE_TIME_TXT": "Tue, Aug 25, 2020 10:04 PM",
    "CACHE_REQUEST_DATA": {
        "url": "/test",
        "method": "get"
    },
    "[[headers]]": {},
    "[[mock]]": true,
    "[[status]]": 200,
    data: {
        username: 'calvin',
        sex: 'male',
        code: 200
    }
};

module.exports = new Promise(resolve => {
    setTimeout(() => {
        resolve(data);
    }, 1000);
});