import { get } from 'lodash'
import { Request, Response } from 'express'
import { getPage, getCollection, DataVersion } from '@/services'

export default async function (req: Request, res: Response) {
  const version = req.query._storyblok
    ? DataVersion.DRAFT
    : DataVersion.PUBLISHED

  try {
    const [page, posts, stories] = await Promise.all([
      getPage('home', {
        version
      }),
      getCollection('articles', {
        page: 1,
        perPage: 3,
        version
      }),
      getCollection('stories', {
        page: 1,
        perPage: 6,
        version
      })
    ])

    res.render('home', {
      layout: 'base',
      story: get(page, 'data.story', null),
      posts: get(posts, 'data.stories', []),
      stories: get(stories, 'data.stories', [])
    })
  } catch (error) {
    res.render('error', {
      error
    })
  }
}
