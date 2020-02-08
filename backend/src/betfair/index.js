var https = require('https');
const conexao =  require('./Conexao');


var FIRST_INDEX = 0;
var DEFAULT_ENCODING = 'utf-8';
var DEFAULT_JSON_FORMAT = '\t';

start();
    function start() {
        getNextAvailableHorseRace(conexao());
    }

    function getNextAvailableHorseRace(options, response) {
        var requestFilters = '{"marketIds": ["1.167778563"],"priceProjection": {"priceData": ["EX_BEST_OFFERS", "EX_TRADED"],"virtualise": "true"}}';
        var jsonRequest = constructJsonRpcRequest('listMarketBook', requestFilters );
        var str = '';
        var req = https.request(options,function (res){
            res.setEncoding(DEFAULT_ENCODING);
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function (chunk) {
                var response = JSON.parse(str);
                handleError(response);
                console.log(JSON.stringify(response, null, DEFAULT_JSON_FORMAT));
               
            });
            
        });
        // Send Json request object
        req.write(jsonRequest, DEFAULT_ENCODING);
        req.end();

        req.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        });
    }

    function getListOfRunners(options, response) {
        var marketId = retrieveMarketId(response);
        console.log("Get list of runners for market Id: " + marketId);
        var requestFilters = '{"marketIds":["' + marketId + '"],"priceProjection":{"priceData":["EX_BEST_OFFERS"],"exBestOfferOverRides":{"bestPricesDepth":2,"rollupModel":"STAKE","rollupLimit":20},"virtualise":false,"rolloverStakes":false},"orderProjection":"ALL","matchProjection":"ROLLED_UP_BY_PRICE"}';
        var jsonRequest = constructJsonRpcRequest('listMarketBook', requestFilters );
        var str = '';
        var req = https.request(options,function (res){
            res.setEncoding(DEFAULT_ENCODING);
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function (chunk) {
                var response = JSON.parse(str);
                handleError(response);
                // Place bet on first runner
                placeBet(options, response, marketId);
            });
        });
        req.write(jsonRequest, DEFAULT_ENCODING);
        req.end();
        req.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
            return;
        });
    }

    function placeBet(options, response, marketId) {
        var str = '';
        var selectionId  = retrieveSelectionId(response);
        // Invalid price and size, change that to minimum price of 2.0
        var price = '2';
        var size = '0.01';
        var customerRef = new Date().getMilliseconds();
        console.log("Place bet on runner with selection Id: " + selectionId);
        var requestFilters = '{"marketId":"'+ marketId+'","instructions":[{"selectionId":"' + selectionId + '","handicap":"0","side":"BACK","orderType":"LIMIT","limitOrder":{"size":"' + size + '","price":"' + price + '","persistenceType":"LAPSE"}}],"customerRef":"'+customerRef+'"}';
        var jsonRequest = constructJsonRpcRequest('placeOrders', requestFilters );
        var req = https.request(options,function (res){
            res.setEncoding(DEFAULT_ENCODING);
            res.on('data', function (chunk) {
                str += chunk;
            });
            res.on('end', function (chunk) {
				var response = JSON.parse(str);
				handleError(response);
                console.log(JSON.stringify(response, null, DEFAULT_JSON_FORMAT));
            });
        });
        req.write(jsonRequest, DEFAULT_ENCODING);
        req.end();
        req.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        });
    }





    function retrieveSelectionId(response) {
        return response.result[FIRST_INDEX].runners[FIRST_INDEX].selectionId;
    }

    function retrieveMarketId(response) {
        return response.result[FIRST_INDEX].marketId;
    }


    function constructJsonRpcRequest(operation, params) {
        return '{"jsonrpc":"2.0","method":"SportsAPING/v1.0/' +  operation + '", "params": ' + params + ', "id": 1}';
    }
    
    function handleError(response) {
		if (response.error != null) {
            if (Object.keys(response.error).length > 2) {
                console.log("Error with request!!");
                console.log(JSON.stringify(response, null, DEFAULT_JSON_FORMAT));
                console.log("Exception Details: ");
                console.log(JSON.stringify(retrieveExceptionDetails(response), null, DEFAULT_JSON_FORMAT));
            }
			process.exit(1);
		}
	}
	
	function retrieveExceptionDetails(response) {
		return response.error.data.APINGException;
    }