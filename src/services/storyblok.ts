import { config } from 'dotenv'
import { Request } from 'express'
import { get } from 'lodash'
import StoryblokClient, { StoryblokResult } from 'storyblok-js-client'

config()

export enum DataVersion {
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

export interface StoryblokParams {
  version?: DataVersion
  resolve?: string
}

export interface CollectionParams extends StoryblokParams {
  perPage?: number
  page?: number
  withStartpage?: number
  withTag?: string | null
  resolve?: string
  filter?: Record<string, any>
}

export const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  cache: {
    type: 'memory'
  }
})

export function usePagination(req: Request, res: StoryblokResult) {
  const page = +get(req.query, 'page', 1)
  const pages = Math.max(get(res, 'total', 0) / get(res, 'perPage', 0))
  const hasNextPage = page < pages
  const hasPrevPage = page > 1 && page <= pages

  return {
    page,
    next: {
      active: hasNextPage,
      page: hasNextPage ? page + 1 : page
    },
    prev: {
      active: hasPrevPage,
      page: hasPrevPage ? page - 1 : page
    }
  }
}

export function getCollection(slug: string, params?: CollectionParams) {
  return Storyblok.get(`cdn/stories`, {
    ...(params?.withTag && { with_tag: params?.withTag }),
    ...(params?.filter && { filter_query: params?.filter }),
    starts_with: slug,
    per_page: params?.perPage,
    page: params?.page ?? 1,
    is_startpage: params?.withStartpage ?? 0,
    resolve_relations: params?.resolve,
    version: params?.version ?? DataVersion.PUBLISHED
  })
}

export function getPage(slug: string, params?: StoryblokParams) {
  return Storyblok.get(`cdn/stories/${slug}`, {
    resolve_relations: params?.resolve,
    version: params?.version ?? DataVersion.PUBLISHED
  })
}

export function getTags(slug: string, params?: StoryblokParams) {
  return Storyblok.get('cdn/tags', {
    starts_with: slug,
    version: params?.version ?? DataVersion.PUBLISHED
  })
}
