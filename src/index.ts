import { config } from 'dotenv'
import express from 'express'
import Middleware, { useErrorHandler } from '@/middleware'
import Router from '@/routes'

config()

const App = express()

Middleware(App)
Router(App)

App.use(useErrorHandler)

App.listen(process.env.PORT || 8080, function () {
  console.log('App server is listening on port 8080')
})
