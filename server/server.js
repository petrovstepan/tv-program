const path = require('path')
const express = require('express')
const next = require('next')

const app = next(require(path.join(__dirname, '..', 'next.config.js')))
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query)
  })
  

  // server.get('/posts/:id', (req, res) => {
  //   return app.render(req, res, '/posts', { id: req.params.id })
  // })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen('8080', '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on http://localhost`)
  })
})