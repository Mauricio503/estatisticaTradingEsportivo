const axios = require('axios');


module.exports = {
    async odd120a150(request,response){
        const apiResponse = await axios.get("https://api.totalcorner.com/v1/match/today?token=9f0c3e829ed2bfd5&type=inplay&columns=events,odds");
        const {data} = apiResponse.data;
        const [start] = data;
        const t = []
        data.forEach(element =>{
            element.i_odds.forEach(element2 =>{
                if(Number.parseFloat(element2) >= 1.40 && Number.parseFloat(element2) <= 2){
                    t.push(element);
                }
            });
            
        });
        return response.json(t);
    },
};