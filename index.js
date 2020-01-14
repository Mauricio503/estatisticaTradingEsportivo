const express = require('express')
const bodyParser  = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.send('Funcionando');
})

const rotas = require('./rotas')
app.use('/api', app.router('./rotas'))

const port = 3001

app.listen(port, () => {
    console.log('o Servidor esta rodando em http://localhost:', port)
})
