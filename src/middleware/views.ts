import path from 'path'
import { Application } from 'express'
import { engine } from 'express-handlebars'
import * as helpers from '@/helpers'

export default function (App: Application): Application {
  console.info(`Booting the 'Views' middleware...`)

  App.engine(
    '.hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'main',
      layoutsDir: path.join(__dirname, '../../views/layouts'),
      partialsDir: [
        path.join(__dirname, '../../views/components'),
        path.join(__dirname, '../../views/components/common')
      ],
      helpers: {
        ...helpers,
        // @ts-ignore
        section: function (name, options) {
          // @ts-ignore
          if (!this._sections) this._sections = {}
          // @ts-ignore
          this._sections[name] = options.fn(this)
          return null
        }
      }
    })
  )

  App.set('view engine', '.hbs')
  App.set('views', path.join(__dirname, '../../views'))

  return App
}
