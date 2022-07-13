import cors from 'cors'
import { Application } from 'express'

export default function (App: Application): Application {
  console.info(`Booting the 'CORS' middleware...`)

  const options = {
    origin: process.env.APP_URL || `http://localhost:${process.env.PORT}`,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  }

  App.use(cors(options))

  return App
}
