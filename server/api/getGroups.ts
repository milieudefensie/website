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
  try {
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

    const groups: Group[] = []

    response.data.allGroups.forEach((group: Group) => {
      if (
        group.title !== 'Zeeland' &&
        group.title !== 'Flevoland' &&
        group.title !== 'Drenthe'
      ) {
        groups.push(group)
      }
    })

    return groups
  } catch (error) {
    console.error('Error fetching DatoCMS groups:', error)
    throw error
  }
})
