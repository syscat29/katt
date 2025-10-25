'use client'

import { useLinkStore } from '../lib/store'
import { Link } from '../lib/types'
import LinkListItem from './LinkListItem'

export default function LinksList() {
  const { links } = useLinkStore()

  if (links.length === 0) return null

  return (
    <section className='space-y-3'>
      <h2 className='font-bold'>Recent links</h2>
      {links.length !== 0 && (
        <div className='space-y-2'>
          {links
            .slice(-5)
            .reverse()
            .map((link: Link) => (
              <LinkListItem key={link.id} {...link} />
            ))}
        </div>
      )}
    </section>
  )
}
