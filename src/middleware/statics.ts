import path from 'path'
import express, { Application } from 'express'

export default function (App: Application): Application {
  console.info(`Booting the 'Statics' middleware...`)

  // Loads Options
  const options = { maxAge: 31557600000 }

  // Load Statics
  App.use(
    '/public',
    express.static(path.join(__dirname, '../../public'), options)
  )

  return App
}
