import { get } from 'lodash'
import { Request, Response } from 'express'
import {
  getTags,
  getPage as getStory,
  getCollection as getStories,
  usePagination,
  DataVersion
} from '@/services'
import { Routes } from '@/types/enums'

function getStoriesList(slug: string, req: Request) {
  const version = req.query._storyblok
    ? DataVersion.DRAFT
    : DataVersion.PUBLISHED

  const page = get(req.query, 'page', 1)
  const tag = get(req.query, 'tag', null)

  return getStories(slug, {
    withTag: tag?.toString(),
    page: !isNaN(+page) ? +page : 1,
    perPage: 6,
    version
  })
}

function getTagsList(slug: string, req: Request) {
  const version = req.query._storyblok
    ? DataVersion.DRAFT
    : DataVersion.PUBLISHED

  return getTags(slug, { version })
}

export async function getPage(req: Request, res: Response) {
  const homePath = 'home'

  const version = req.query._storyblok
    ? DataVersion.DRAFT
    : DataVersion.PUBLISHED

  const path = req.path === Routes.INDEX ? homePath : req.path
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  if (path.includes(homePath)) {
    res.redirect(Routes.INDEX)
  }

  try {
    const response = await getStory(path, {
      version
    })
    const story = get(response, 'data.story', null)

    if (get(story, 'content.component', null) === 'overview') {
      const [stories, tags] = await Promise.all([
        getStoriesList(story.slug, req),
        getTagsList(story.slug, req)
      ])

      return res.render('_slug', {
        story,
        tag: get(req.query, 'tag', null),
        tags: get(tags, 'data.tags', null),
        stories: get(stories, 'data.stories', null),
        pagination: usePagination(req, stories)
      })
    }

    res.render('_slug', {
      layout:
        get(story, 'content.component', null) === 'story' ? 'base' : 'main',
      story
    })
  } catch (error) {
    console.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`)

    res.render('404', {
      layout: 'base',
      error
    })
  }
}
