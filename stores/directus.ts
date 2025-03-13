import { createDirectus, rest, readItems } from '@directus/sdk'

export interface Article {
  id: number
  path: string
  title: string
  content: string
}

export interface Event {
  title: string
  path: string
  date: Date
  location: string
}

interface Schema {
  articles: Article[]
  events: Event[]
}

const directus = createDirectus<Schema>('http://directus.rebel.tools').with(
  rest()
)

export const useDirectusStore = defineStore('directusStore', {
  state: () => ({
    // articles: [] as Article[],
  }),
  actions: {
    // ARTICLES
    async fetchArticle(slug: string) {
      const query = {
        filter: { path: { _eq: slug } },
        limit: 1,
      }

      const articles = await directus.request(readItems('articles', query))

      if (!articles[0]) {
        throw new Error('Article not found')
      } else {
        return articles[0]
      }
    },

    // EVENTS
    async fetchEvent(slug: string) {
      const query = {
        filter: { path: { _eq: slug } },
        limit: 1,
      }

      const articles = await directus.request(readItems('events', query))

      if (!articles[0]) {
        throw new Error('Event not found')
      } else {
        return articles[0]
      }
    },

    async fetchUpcomingEvents() {
      // Fetch upcoming events (including events that happened earlier today)
    },
  },
})
