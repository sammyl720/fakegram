const express = require('express')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const next = require('next')
const mongoose = require('mongoose')
require('dotenv').config()
const resolvers = require('./graphql/resolvers')
const schema = require('./graphql/schema')
const expressGraphql = require('express-graphql')
const PORT = process.env.PORT || 3000

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7) // 1 hour
    // server.use(session({
    //   name: 'session',
    //   keys: ['key1', 'key2'],
    //   cookie: {
    //     // secure: true,
    //     // httpOnly: true,
    //     // domain: 'example.com',
    //     // path: 'foo/bar',
    //     expires: expiryDate
    //   }
    // }))

    server.use(cookieParser())
    // server.use((req, res, next) => {
    //   console.log('cookies', req.cookies)
    //   next()
    // })
    server.use(
      '/graphql',
      expressGraphql({
        rootValue: resolvers,
        schema: schema,
        graphiql: process.env.NODE_ENV !== 'production'
      })
    )
    server.all('*', (req, res) => {
      return handle(req, res)
    })
    mongoose
      .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('connected to db')
        server.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`)
        })
      })
  })
  .catch(err => {
    console.log(` error ${err}`)
  })
