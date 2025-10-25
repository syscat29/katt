import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Link } from './types'

interface LinkStore {
  links: Link[]
  addLink: (link: Link) => void
  // removeLink: (id: string) => void
}

export const useLinkStore = create<LinkStore>()(
  persist(
    (set, get) => ({
      links: [],

      addLink: (link: Link) => set({ links: [...get().links, link] }),
    }),
    {
      name: 'link-storage',
    },
  ),
)
