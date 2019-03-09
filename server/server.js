require('./withEnv')()
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
//const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: true })
const handle = app.getRequestHandler()
//const getConfig = require('next/config')
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
//const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()


app.prepare().then(() => {
    const server = express()

    console.log(server.get('env'))

    server.get('/', (req, res) => {
        return app.render(req, res, '/index', req.query)
    })

    server.get('/dynamic', (req, res) => {
        return app.render(req, res, '/dynamic', req.query)
    })

    server.get('/counter', (req, res) => {
        return app.render(req, res, '/counter', req.query)
    })

    server.get('/home/:id', (req, res) => {
        return app.render(req, res, '/home', { id: req.params.id })
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
