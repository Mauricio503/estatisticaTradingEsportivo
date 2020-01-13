const express = require('express')
const bodyParser  = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.get('/', (req,res) => {
    res.send('Funcionando')
})

const port = 3001

app.listen(port, () => {
    console.log('ser running on http://localhost:', port)
})
