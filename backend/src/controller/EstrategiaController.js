const axios = require('axios');
const scraping  = require('../scraping/Index');
const Entrada = require('../models/Entrada');
const conexao =  require('../betfair/Conexao');
const BuscarMercado = require('../betfair/BuscarMercado');
var https = require('https');

var FIRST_INDEX = 0;
var DEFAULT_ENCODING = 'utf-8';
var DEFAULT_JSON_FORMAT = '\t';
let situacaoJogo1 = false;

module.exports = {
    async layPrimeiroTempo(request,response){
        const {posicaoFavorito} = request.query;
        const {liveForm,codigoMercado,codigoLinha} = request.body;
        var jsonObj = JSON.parse(liveForm);
        let contBarraBaixa = 0,contBarraMediaOuAlta = 0;
        if(posicaoFavorito == "positivo"){
            jsonObj.map(element => {
                if(element.minute <= 45 && element.minute > jsonObj.length-7 && element.value > -30 
                    && element.value <= 0){
                        contBarraBaixa ++;
                }
                if(element.minute <= 45 && element.minute > jsonObj.length-3 && element.value <= -30){
                    contBarraMediaOuAlta ++;
                }
            });
        }else{
            jsonObj.map(element => {
                if(element.minute <= 45 && element.minute > jsonObj.length-7 && element.value <= 30 
                    && element.value >= 0){
                        contBarraBaixa ++;
                }
                if(element.minute <= 45 && element.minute > jsonObj.length-3 && element.value > 30){
                    contBarraMediaOuAlta ++;
                }
            });
        }
        
        var requestFilters = '{"marketIds":["' + codigoMercado + '"],"priceProjection":{"priceData":["EX_BEST_OFFERS"],"exBestOfferOverRides":{"bestPricesDepth":2,"rollupModel":"STAKE","rollupLimit":20},"virtualise":false,"rolloverStakes":false},"orderProjection":"ALL","matchProjection":"ROLLED_UP_BY_PRICE"}';
                    var jsonRequest =  constructJsonRpcRequest('listMarketBook', requestFilters);
                    var str = '';
                    var resp = '';
                    var req = https.request(conexao(),function (res){
                        res.setEncoding(DEFAULT_ENCODING);
                        res.on('data', function (chunk) {
                            str += chunk;
                        });

                        res.on('end', function (chunk) {
                            resp = JSON.parse(str);
                            handleError(resp);
                            resp.result.forEach(el =>{
                                el.runners.forEach(el2 => {
                                    if(el2.selectionId == codigoLinha){
                                        console.log(el2);
                                    }
                                });
                            });
                            //console.log(JSON.stringify(resp.result, null, DEFAULT_JSON_FORMAT));
                        });
                    });
                    req.write(jsonRequest, DEFAULT_ENCODING);
                    req.end();
                    req.on('error', function(e) {
                        console.log(e);
                    });
        
        
        if(contBarraBaixa >= 5 || contBarraMediaOuAlta >= 2){
            if(situacaoJogo1 == false){
                situacaoJogo1 = true;
                /////busca mercado
                    
            }else{
                
            }
            return response.json("true");
        }else if(contBarraMediaOuAlta >= 1 && contBarraBaixa >= 1){
            return response.json("true");
        }else{
            return response.json("false");
        }
    },
    async salvarEntrada(times,oddsInicias,tipo){
        var data = new Date();
        const entrada = await Entrada.create({times,data,oddsInicias,tipo});
    },
    async pesquisa(request, response){
        const apiResponse = await axios.get("https://api.totalcorner.com/v1/match/today?token=9f0c3e829ed2bfd5&type=inplay&columns=odds,shotOff,possession");
        const {data} = apiResponse.data;
        const filtro = [];
        const {placarHome, placarAway,timeOdd, oddInicial, oddFinal, 
            tempoJogoInicial, tempoJogoFinal, rematesInicial, rematesFinal,
            timeRemates, rematesInicial2, rematesFinal2,
            timeRemates2, posseBolaInicialHome,
            posseBolaFinalHome} = request.query;
        data.forEach(element =>{
             var passouPeloFiltro = true;
            // filtra placar
            if(Number.parseFloat(element.hg) != Number.parseFloat(placarHome) 
                || Number.parseFloat(element.ag) != Number.parseFloat(placarAway)){
                    passouPeloFiltro = false;
            }
            // filtro odd
            if(timeOdd == 'home'){
                var indice = 0;
                element.i_odds.map(e => {
                    if(indice == 0){
                        if(Number.parseFloat(e) < Number.parseFloat(oddInicial)
                        || Number.parseFloat(e) > Number.parseFloat(oddFinal)){
                            passouPeloFiltro = false;
                        }
                    }
                    indice = indice + 1;
                });
            }else{
                var indice = 0;
                    element.i_odds.map(e => {
                        if(indice == 2 && Number.parseFloat(e) < Number.parseFloat(oddInicial)
                            && Number.parseFloat(e) > Number.parseFloat(oddFinal)){
                            passouPeloFiltro = false;
                        }
                    indice = indice + 1;
                    });
            }
            // filtro tempo
            if(Number.parseFloat(element.status.replace("Half","-1")) <  Number.parseFloat(tempoJogoInicial)
                || Number.parseFloat(element.status.replace("Half","-1")) >  Number.parseFloat(tempoJogoFinal)){
                    passouPeloFiltro = false;
            }
            //filtro remates
            var indR = 0;
            element.shot_off.map(e =>{
                if(indR == 0){
                    if(timeRemates == "home"){
                        if(Number.parseFloat(e) < Number.parseFloat(rematesInicial)
                         || Number.parseFloat(e) > Number.parseFloat(rematesFinal)){
                            passouPeloFiltro = false;
                        }
                    }
                    if(timeRemates2 == "home"){
                        if(Number.parseFloat(e) < Number.parseFloat(rematesInicial2)
                         || Number.parseFloat(e) > Number.parseFloat(rematesFinal2)){
                            passouPeloFiltro = false;
                        }
                    }
                }else{
                    if(timeRemates == "away"){
                        if(Number.parseFloat(e) < Number.parseFloat(rematesInicial)
                         || Number.parseFloat(e) > Number.parseFloat(rematesFinal)){
                            passouPeloFiltro = false;
                        }
                    }
                    if(timeRemates2 == "away"){
                        if(Number.parseFloat(e) < Number.parseFloat(rematesInicial2)
                         || Number.parseFloat(e) > Number.parseFloat(rematesFinal2)){
                            passouPeloFiltro = false;
                        }
                    }
                }
                indR = indR + 1;
            });
            //filtro posse de bola
            var indP = 0
            element.possess.map(e => {
                if(indP == 0){
                    if(Number.parseFloat(e) < Number.parseFloat(posseBolaInicialHome)
                     || Number.parseFloat(e) > Number.parseFloat(posseBolaFinalHome)){
                        passouPeloFiltro = false;
                    }
                }
                indP = indP + 1;
            });
            if(passouPeloFiltro == true){
                filtro.push(element);
            }
        });
        
        return response.json(filtro);
    },
};

function retrieveSelectionId(response) {
        return response.result[FIRST_INDEX].runners[FIRST_INDEX].selectionId;
    }

function retrieveMarketId(response) {
    return response.result[FIRST_INDEX].marketId;
}

function constructJsonRpcRequest(operation, params) {
    return '{"jsonrpc":"2.0","method":"SportsAPING/v1.0/' +  operation + '", "params": ' + params + ', "id": 1}';
}
	
function retrieveExceptionDetails(response) {
	return response.error.data.APINGException;
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
    function efetuar(options, codigoMercado) {
       var requestFilters = '{"marketIds":["' + codigoMercado + '"],"priceProjection":{"priceData":["EX_BEST_OFFERS"],"exBestOfferOverRides":{"bestPricesDepth":2,"rollupModel":"STAKE","rollupLimit":20},"virtualise":false,"rolloverStakes":false},"orderProjection":"ALL","matchProjection":"ROLLED_UP_BY_PRICE"}';
        var jsonRequest =  constructJsonRpcRequest('listMarketBook', requestFilters);
        var str = '';
        var resp = '';
        var req = https.request(conexao(),function (res){
            res.setEncoding(DEFAULT_ENCODING);
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function (chunk) {
                resp = JSON.parse(str);
                handleError(resp);
                console.log(JSON.stringify(resp, null, DEFAULT_JSON_FORMAT));
            });
        });
        req.write(jsonRequest, DEFAULT_ENCODING);
        req.end();
        req.on('error', function(e) {
            console.log(e);
        });
    }