const config = useRuntimeConfig()

type Analytics = {
  activeUsersByHostname: {
    hostName: string
    activeUsers: string
  }[]
  conversions: {
    activeUsers: string
    eventName: string
  }[]
}

export default defineEventHandler(async (event) => {
  try {
    const analytics: Analytics = await $fetch(
      'https://hook.eu2.make.com/6qj25errk5nhybae6kt3wa9rzad2c3ob',
      {
        method: 'GET',
      }
    )

    let totalActiveUsers = 0

    analytics.activeUsersByHostname.forEach((hostname) => {
      totalActiveUsers += Number(hostname.activeUsers)
    })

    const joinChatConversions = Number(
      analytics.conversions?.find(
        (conversion) => conversion.eventName === 'join_chat'
      )?.activeUsers
    )

    return {
      totalActiveUsers,
      hostnames: analytics.activeUsersByHostname,
      joinChatConversions,
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    throw error
  }
})
