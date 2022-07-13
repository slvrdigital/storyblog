import fs from 'fs/promises'
import { get, kebabCase } from 'lodash'
import { Application, Request, Response, NextFunction } from 'express'
import { Routes } from '@/types/enums'
import config from '@/config'

function useMeta() {
  return {
    siteName: config.name,
    siteDescription: config.description,
    author: config.author
  }
}

async function useInlineStyles() {
  const styles = await fs.readFile('./public/styles/style.min.css', 'utf8')
  return styles
}

export default function (App: Application): Application {
  console.info(`Booting the 'Locals' middleware...`)

  App.use(async function (req: Request, res: Response, next: NextFunction) {
    res.locals = {
      Routes,
      meta: useMeta(),
      isDev: process.env.NODE_ENV === 'development',
      style: await useInlineStyles(),
      slug: kebabCase(req.path === Routes.INDEX ? 'home' : req.path)
    }

    next()
  })

  return App
}
