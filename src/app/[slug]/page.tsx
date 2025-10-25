import { getShortLink } from '@/src/server/actions'
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'

export default async function Shortlink({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const link = await getShortLink(slug)

  if (link) {
    redirect(link, RedirectType.push)
  }

  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='flex flex-col items-center text-center'>
        <div>
          <p className='text-9xl font-bold'>
            4<span className='text-accent'>0</span>4
          </p>
          <h1 className='text-white text-3xl uppercase font-bold'>not found</h1>
        </div>
        <p className='text-foreground/80 mt-4'>
          The link you&apos;re looking for does not exist or has been disabled.
        </p>

        <Link
          href='/'
          className='bg-accent rounded-md px-4 py-2 text-sm font-medium hover:bg-accent/80 transition-all mt-10'
        >
          To Home
        </Link>
      </div>
    </div>
  )
}
