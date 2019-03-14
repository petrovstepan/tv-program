require('./withEnv')()
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const host = process.env.HOST || 'localhost'
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
})

const handle = app.getRequestHandler()
const {
  initializeCache,
  createTvProgram,
  getChannelWithProgram,
} = require('./controllers')

app.prepare().then(async () => {
  const server = express()

  await initializeCache()

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query)
  })

  server.get('/channel/:id', (req, res) => {
    return app.render(req, res, '/channel', { id: req.params.id })
  })

  server.get('/api/getchannel/:id', async (req, res) => {
    const channel = await getChannelWithProgram(req.params.id)

    if (channel) {
      return res.json({
        status: 'OK',
        data: {
          channel,
        },
      })
    } else {
      res.status(404)
      return res.json({
        status: 'FAIL',
        error: true,
        data: {
          message: 'Канала не существует',
        },
      })
    }
  })

  server.get('/api/gettvprogram', async (req, res) => {
    const { offset = 0 } = req.query
    const data = await createTvProgram(offset)
    return res.json(data)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  if (process.env.ENGINE === 'Heroku') {
    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on heroku on ${port}`)
    })
  } else {
    server.listen(port, host, err => {
      if (err) throw err
      console.log(`> Ready on ${host}:${port}`)
    })
  }
})
