import { Express } from 'express'
import Controller from '@/controllers/home'
import { Routes } from '@/types/enums'

export default function (app: Express) {
  app.get(Routes.INDEX, Controller)
}
