import Handlebars from 'handlebars'
import dayjs from 'dayjs'
//@ts-ignore
import showdown from 'showdown'
import { Routes } from '../types/enums'

export type AssetType = 'video' | 'image'

export type ImageOptions = {
  width?: number
  height?: number
  filters?: string[]
}

export function markdown(text: string) {
  const converter = new showdown.Converter()
  const html = converter.makeHtml(text)
  return new Handlebars.SafeString(html)
}

export function json(ctx: any): string {
  return JSON.stringify(ctx, undefined, 2)
}

export function truncate(value: string, options: any) {
  const max = options.hash?.max || '150'
  const formattedString = value?.substring(0, max)
  // @ts-ignore
  const content = options.fn ? options.fn(this) : '...'
  return new Handlebars.SafeString(
    value?.length > max ? `${formattedString} ${content}` : formattedString
  )
}

export function transformImage(image: string, resolution?: string) {
  if (!resolution) return image

  return image + '/m/' + resolution // + '/filters:quality(100)'
}

export function imageSize(image: string, options: any) {
  const factor = options.hash?.factor || 0.1
  let width = options.hash?.width || 16
  let height = options.hash?.height || 9

  const size = image?.match(/(\d+\x\d+)/)

  if (Array.isArray(size)) {
    const [imgWidth, imgHeight] = size[0].split('x').map(Number)
    width = factor * imgWidth
    height = factor * imgHeight
  }

  return {
    width,
    height
  }
}

export function concat() {
  let outStr = ''

  for (var arg in arguments) {
    if (typeof arguments[arg] !== 'object') {
      outStr += arguments[arg]
    }
  }

  return outStr
}

// @ts-ignore
export const eq = (v1, v2) => v1 === v2

// @ts-ignore
export const ne = (v1, v2) => v1 !== v2

// @ts-ignore
export const lt = (v1, v2) => v1 < v2

// @ts-ignore
export const gt = (v1, v2) => v1 > v2

// @ts-ignore
export const lte = (v1, v2) => v1 <= v2

// @ts-ignore
export const gte = (v1, v2) => v1 >= v2

// @ts-ignore
export function and() {
  return Array.prototype.every.call(arguments, Boolean)
}

// @ts-ignore
export function or() {
  return Array.prototype.slice.call(arguments, 0, -1).some(Boolean)
}

export function published(dateIsoString: string) {
  return dayjs(dateIsoString).format('MMMM D, YYYY')
}

export function assetTypeEq(filename: string, type: AssetType): boolean {
  const videoExtensions = ['.avi', '.mp4', '.mpeg	', '.webm']
  const videoType = videoExtensions.some((item) => filename.includes(item))

  return (videoType ? 'video' : 'image') === type
}

export function routePath(
  route: Routes,
  options: { hash: Record<string, string> }
) {
  const params = options.hash

  const pathMatch = route?.split('/').reduce((pathChunks: string[], chunk) => {
    let _paramMatch = chunk.match(/:[a-z]+/)

    if (_paramMatch) {
      let key = chunk.replace(/[:|?]/g, '')
      if (params[key]) {
        pathChunks.push(params[key])
      }
    } else {
      pathChunks.push(chunk)
    }

    return pathChunks
  }, [])

  return pathMatch?.join('/') ?? '/'
}
