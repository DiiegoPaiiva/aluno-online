const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000


const Usuario = mongoose.model('Usuario', { name: String, email: String, senha: String })

app.get('/', async (req, res) => {
    const usuarios = await Usuario.find()
    return res.send(usuarios)
})

app.delete('/:id', async (req, res) => {
    const usuario = await Usuario.findByIdAndDelete(req.params.id)
        return res.send(usuario)
})

app.put('/:id', async (req, res) => {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        senha: req.body.senha
    }, {
        new: true
    })
        return res.send(usuario)
})

app.post('/', async (req, res) => {
    const usuario = new Usuario({
        name: req.body.name,
        email: req.body.email,
        senha: req.body.senha
    })

    await usuario.save()
    return res.send(usuario)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://diegopaiva:Dapp0918@test.yaapjdv.mongodb.net/?retryWrites=true&w=majority&appName=Test')
    console.log('Rodando')
})