import { Express } from 'express'

import HomeRouter from './home'
import PageRouter from './page'
import HooksRouter from './hooks'

export default function Router(App: Express) {
  HooksRouter(App)
  HomeRouter(App)
  PageRouter(App)
}
