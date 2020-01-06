const express = require('express')
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

app.prepare().then(() => {
  const server = express()

  server.use('/graphql', expressGraphql({
    rootValue: resolvers,
    schema: schema,
    graphiql: true
  }))

  server.all('*', (req, res) => {
    return handle(req, res)
  })
  mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to db')
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
}).catch(err => {
  console.log(` error ${err}`)
})
