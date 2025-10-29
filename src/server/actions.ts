'use server'

import generateShortcode from '../lib/generateShortcode'
import { MAX_SHORTCODE_ATTEMPTS } from '../lib/constants'
import prisma from './prisma'

let shortcode: string
let attempts: number = 0

export async function createShortUrl(url: string) {
  while (attempts < MAX_SHORTCODE_ATTEMPTS) {
    shortcode = generateShortcode()

    const isShortcodeValid = await prisma.uRL.findUnique({
      where: { slug: shortcode },
    })

    if (!isShortcodeValid) {
      break
    }

    attempts++
  }

  if (attempts === MAX_SHORTCODE_ATTEMPTS) {
    throw new Error(
      'Failed to generate a unique shortcode after multiple attempts.',
    )
  }

  try {
    const payload = {
      original_url: url,
      slug: shortcode,
    }

    const shortUrl = await prisma.uRL.create({ data: payload })

    console.table({
      id: shortUrl.id,
      original_url: shortUrl.original_url,
      slug: shortUrl.slug,
    })

    return shortUrl
  } catch (error) {
    console.error('Error creating short URL:', error)
    throw error
  }
}

export async function getShortLink(slug: string): Promise<string> {
  try {
    const url = await prisma.uRL.findUnique({
      where: { slug },
      cacheStrategy: { ttl: 31536000 },
    })

    if (!url) {
      return ''
    }

    return url.original_url
  } catch (error) {
    console.error('Error getting short URL:', error)
    throw error
  }
}
