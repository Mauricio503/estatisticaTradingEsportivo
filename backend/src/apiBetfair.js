var https = require('https');

// Start the app
DemoApiNgClient();

// Main class that contains all operations
function DemoApiNgClient(){

// Retrieve command line args 
var myArgs = process.argv.slice(2);
// App key
var appkey = 'JKFWdmd1zbUsQotF';
// Session token
var ssid = 'PpJK4EP+0IRz26p9+ekXUhTQpKAG3qyUKsjl1G1MFYQ=';
var FIRST_INDEX = 0;
var DEFAULT_ENCODING = 'utf-8';
var DEFAULT_JSON_FORMAT = '\t';

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

    start();

	// Start from finding the horse race event type id
    function start() {
        listaEventos(options);
    }

    function listaEventos(options) {
        var requestFilters = '{"filter":{}}';
        var jsonRequest = constructJsonRpcRequest('listEventTypes', requestFilters );
        var str = '';
        var req = https.request(options,function (res){
            res.setEncoding(DEFAULT_ENCODING);
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function (chunk) {
                var response = JSON.parse(str);
                handleError(response);
                console.log(retornaIdFutebol(response));
            });
            
        });
        req.write(jsonRequest, DEFAULT_ENCODING);
        req.end();

        req.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        }); 
    }

    function retornaIdFutebol(response) {
        for (var i = 0; i<= Object.keys(response.result).length; i++ ) {
            if (response.result[i].eventType.name == 'Soccer'){
                return response.result[i].eventType.id;
            }
        }
    }

    // get selection id from the response
    function retrieveSelectionId(response) {
        return response.result[FIRST_INDEX].runners[FIRST_INDEX].selectionId;
    }

    // get market id from the response
    function retrieveMarketId(response) {
        return response.result[FIRST_INDEX].marketId;
    }


    function constructJsonRpcRequest(operation, params) {
        return '{"jsonrpc":"2.0","method":"SportsAPING/v1.0/' +  operation + '", "params": ' + params + ', "id": 1}';
    }
    
    // Handle Api-NG errors, exception details are wrapped within response object 
    function handleError(response) {
        // check for errors in response body, we can't check for status code as jsonrpc returns always 200
		if (response.error != null) {
            // if error in response contains only two fields it means that there is no detailed message of exception thrown from API-NG
            if (Object.keys(response.error).length > 2) {
                console.log("Error with request!!");
                console.log(JSON.stringify(response, null, DEFAULT_JSON_FORMAT));
                console.log("Exception Details: ");
                console.log(JSON.stringify(retrieveExceptionDetails(response), null, DEFAULT_JSON_FORMAT));
            }
			process.exit(1);
		}
	}
	
	// Get exception message out of a response object
	function retrieveExceptionDetails(response) {
		return response.error.data.APINGException;
	}
}