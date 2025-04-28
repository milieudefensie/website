const config = useRuntimeConfig()

type AnalyticsRecord = {
  hostName: string
  activeUsers: string
}

export default defineEventHandler(async (event) => {
  try {
    const hostnames: AnalyticsRecord[] = await $fetch(
      'https://hook.eu2.make.com/6qj25errk5nhybae6kt3wa9rzad2c3ob',
      {
        method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json',
        //     authorization: `Bearer ${config.datoSecret}`,
        //   },
        //   body: {
        //     query: `query AllGroups {
        //   allGroups(first: 500) {
        //     coordinates {
        //       latitude
        //       longitude
        //     }
        //     title
        //     organizer
        //     slug
        //   }
        // }`,
        //   },
      }
    )

    let totalActiveUsers = 0

    hostnames.forEach((hostname) => {
      totalActiveUsers += Number(hostname.activeUsers)
    })

    return {
      totalActiveUsers,
      hostnames,
    }
  } catch (error) {
    console.error('Error fetching DatoCMS groups:', error)
    throw error
  }
})
