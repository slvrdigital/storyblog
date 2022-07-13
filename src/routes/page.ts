import { Express } from 'express'
import { getPage } from '@/controllers/page'
import { Routes } from '@/types/enums'

export default function (app: Express) {
  app.get(Routes.PAGE, getPage)
}
