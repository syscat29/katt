'use server'

import generateShortcode from '../lib/generateShortcode'
import prisma from './prisma'

export async function createShortUrl(url: string) {
  try {
    const shortcode = generateShortcode()

    // Check if shortcode exists
    
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
      cacheStrategy: { ttl: 7200, swr: 300 },
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
