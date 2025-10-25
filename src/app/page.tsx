import LinkShortner from '../components/LinkShortner'
import LinksList from '../components/LinksList'

export default function Home() {
  return (
    <div className='flex flex-1 justify-center'>
      <main className='w-full max-w-2xl pt-32 space-y-6'>
        <div className='space-y-3'>
          <h1 className='text-4xl font-bold'>Katt</h1>
          <p className='text-sm text-foreground-muted'>
            Transform long URLs into short, shareable links instantly
          </p>
        </div>
        <LinkShortner />
        <LinksList />
      </main>
    </div>
  )
}
