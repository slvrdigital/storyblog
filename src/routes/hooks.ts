import crypto from 'crypto'
import { get } from 'lodash'
import { Express, Request, Response } from 'express'
import { Routes } from '@/types/enums'
import { Storyblok } from '@/services'

async function clearStoryblokCache(req: Request, res: Response) {
  const signature = get(req.headers, 'webhook-signature', '')
  const body = get(req, 'body', {})

  try {
    verifySignature(body, signature)
    await Storyblok.flushCache()
    res.status(200).json({ status: 'Success' })
  } catch (error) {
    res.sendStatus(403)
  }
}

function verifySignature(
  body: Record<string, any>,
  signature: string | string[]
) {
  // webhookSecret configured in Storyblok settings
  const webhookSecret = process.env.STORYBLOK_WEBHOOK_SECRET ?? ''
  let bodyHmac = crypto
    .createHmac('sha1', webhookSecret)
    .update(JSON.stringify(body))
    .digest('hex')

  if (bodyHmac !== signature) {
    throw new Error('Signature mismatch!')
  }
}

export default function (app: Express) {
  app.post(Routes.CLEAR_STORYBLOK_CACHE, clearStoryblokCache)
}
