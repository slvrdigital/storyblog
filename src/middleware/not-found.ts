import { Request, Response } from 'express'

export default function (req: Request, res: Response) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  console.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`)

  res.status(404)

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url })
    return
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' })
    return
  }

  // default to plain-text. send()
  res.type('txt').send('Not found')
}
