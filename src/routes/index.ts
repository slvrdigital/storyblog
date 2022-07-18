import { Express } from 'express'
import PageRouter from './page'
import HooksRouter from './hooks'

export default function Router(App: Express) {
  HooksRouter(App)
  PageRouter(App)
}
