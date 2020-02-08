var https = require('https');

module.exports = 
function DemoApiNgClient(){

var myArgs = process.argv.slice(2);

var appkey = 'JKFWdmd1zbUsQotF';

var ssid = 'IQq48Y6itVzvc4WaDa/7sefTM8smXVJDTyZr/R2nSxc=';

var options = {
    hostname: 'api.betfair.com',
    port: 443,
    path: '/exchange/betting/json-rpc/v1',
    method: 'POST',
    headers: {
        'X-Application' : appkey,
        'Accept': 'application/json',
        'Content-type' : 'application/json',
        'X-Authentication' : ssid
        }
    }

    return options;
}