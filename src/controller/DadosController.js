var Request = require("request");

// funções
module.exports = {
    async index(req,res){
        Request.get("https://api.totalcorner.com/v1/match/today?token=aa92ad0db4633e70&type=inplay&columns=events,odds,asian,cornerLine,goalLine,asianCorner,attacks", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(JSON.parse(body));
        console.dir(body);
    });
    },
};