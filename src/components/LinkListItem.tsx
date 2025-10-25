import { Link } from '../lib/types'
import ArrowDownRight from './icons/ArrowDownRight'

export default function LinkListItem(props: Link) {
  const { slug, original_url } = props
  const base_url = window?.location.origin

  return (
    <article className='grid bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2'>
      <a
        href={`${base_url}/${slug}`}
        target='_blank'
        className='w-fit text-sm font-bold hover:underline'
      >
        {base_url}/{slug}
      </a>
      <div className='flex items-center gap-1'>
        <ArrowDownRight className='size-3 text-foreground-muted' />
        <a
          href={original_url}
          target='_blank'
          className='text-xs text-foreground-muted max-w-xs whitespace-nowrap overflow-hidden text-ellipsis hover:underline'
        >
          {original_url}
        </a>
      </div>
    </article>
  )
}
