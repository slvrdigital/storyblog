import express, { Application } from 'express'
import cors from 'cors'
import compress from 'compression'
import helmet from 'helmet'

export default function (App: Application): Application {
  console.info(`Booting the 'HTTP' middleware...`)

  // Disable the x-powered-by header in response
  App.disable('x-powered-by')

  // Enable json body parser
  App.use(express.json())

  // Enables helmet headers
  App.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'frame-ancestors': ["'self'", 'app.storyblok.com'],
          'img-src': ["'self'", 'data:', 'a.storyblok.com'],
          'media-src': ["'self'", 'a.storyblok.com'],
          'script-src': ["'self'", 'cdn.ampproject.org'],
          'connect-src': ["'self'", 'cdn.ampproject.org']
        }
      }
    })
  )

  // Enables the CORS
  App.use(cors())

  // Enables the "gzip" / "deflate" compression for response
  App.use(compress())

  return App
}
