const config = useRuntimeConfig()

type Group = {
  coordinates: {
    latitude: number
    longitude: number
  }
  title: string
  organizer: string
  slug: string
}

export default defineEventHandler(async (event) => {
  const response: any = await $fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${config.datoSecret}`,
    },
    body: {
      query: `query AllGroups {
        allGroups(first: 500) {
          coordinates {
            latitude
            longitude
          }
          title
          organizer
          slug
        }
      }`,
    },
  })

  return response.data.allGroups as Group[]
})
