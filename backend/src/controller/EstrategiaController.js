const axios = require('axios');
const scraping  = require('../scraping/Index');

module.exports = {
    async layPrimeiroTempo(request,response){
        const {posicaoFavorito} = request.query;
        const {liveForm} = request.body;
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

        if(contBarraBaixa >= 5 || contBarraMediaOuAlta >= 2){
            return response.json("true");
        }else if(contBarraMediaOuAlta >= 1 && contBarraBaixa >= 1){
            return response.json("true");
        }else{
            return response.json("false");
        }
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