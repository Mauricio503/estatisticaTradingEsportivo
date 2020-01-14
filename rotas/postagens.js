const express = require('express')
const router = express.Router()

router.get('/postagens',(req,res) =>{
    res.json({
        titulo: "primeiro post",
        conteudo: "publicacao",
        autor: "Maurício"
    })
})

module.exports = router
