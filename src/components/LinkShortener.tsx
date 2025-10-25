'use client'

import { useFormStatus } from 'react-dom'
import { createShortUrl } from '../server/actions'
import { useLinkStore } from '../lib/store'
import Scissors from './icons/Scissors'

export default function LinkShortener() {
  const { addLink } = useLinkStore()
  const { pending } = useFormStatus()

  async function handleSubmit(formData: FormData): Promise<void> {
    const url = formData.get('url') as string
    if (!url) throw new Error('URL is required')
    const shortUrl = await createShortUrl(url)
    addLink(shortUrl)
  }

  return (
    <section className='space-y-3'>
      <h2 className='font-bold'>Shorten a URL</h2>
      <form action={handleSubmit} className='flex items-center space-x-2'>
        <input
          name='url'
          type='text'
          placeholder='Enter a URL'
          className='w-full rounded-md border border-foreground-muted px-3 py-2'
        />
        <button
          className='bg-accent text-white border-none size-10 rounded flex items-center justify-center cursor-pointer hover:bg-accent/70 transition-all'
          disabled={pending}
        >
          <Scissors className='size-5' />
        </button>
      </form>
    </section>
  )
}
