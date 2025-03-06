import { createDirectus, rest, readItems } from '@directus/sdk'

interface Article {
  id: number
  path: string
  title: string
  content: string
}

interface Schema {
  articles: Article[]
}

const directus = createDirectus<Schema>('http://directus.rebel.tools').with(
  rest()
)

export const useDirectusStore = defineStore('directusStore', {
  state: () => ({
    // articles: [] as Article[],
  }),
  actions: {
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
  },
})
