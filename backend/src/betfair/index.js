var https = require('https');
const conexao =  require('./Conexao');


var FIRST_INDEX = 0;
var DEFAULT_ENCODING = 'utf-8';
var DEFAULT_JSON_FORMAT = '\t';

start();
    function start() {
        getOdds(conexao(),'1.168516998');
    }

module.exports = 
   function getOdds(options,codigoMercado) {
        var requestFilters = '{"marketIds": ['+codigoMercado+'],"priceProjection": {"priceData": ["EX_BEST_OFFERS", "EX_TRADED"],"virtualise": "true"}}';
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
                return response;
            });
            
        });
        // Send Json request object
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