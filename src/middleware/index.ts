import { Application } from 'express'

import CORS from './cors'
import Http from './http'
import Locals from './locals'
import Views from './views'
import Statics from './statics'

export * from './error'

export default function (App: Application): Application {
  // Check if CORS is enabled
  // if (Locals.config().isCORSEnabled) {
  //   // Mount CORS middleware
  //   App = CORS.mount(App)
  // }

  // Mount local view variables middleware
  App = Locals(App)

  // Mount basic express apis middleware
  App = Http(App)

  // Mount view engine middleware
  App = Views(App)

  // Mount statics middleware
  App = Statics(App)

  return App
}
