const config = useRuntimeConfig()

// Type to be used in the front-end
export type Event = {
  coordinates?: {
    latitude: number
    longitude: number
  } | null
  title: string
  date: string
  slug: string
}

// Dato API call response
type DatoCMSResponse = {
  data: {
    allEvents: Event[]
  }
}

// ControlShift Labs event (using authenticated API)
type CSLEvent = {
  slug: string
  title: string
  url: string
  description: string
  start_at: string
  end_at: string
  start_in_zone: string
  end_in_zone: string
  time_zone: string
  virtual: boolean
  launched_at: string
  locale: string
  host_address: string | null
  max_attendees_count: number | null
  external_id: string
  host: {
    member_id: number
    full_name: string
    email: string
    phone_number: string
    postcode: string
  }
  location: {
    query: string
    latitude: string
    longitude: string
    street_number: string
    street: string
    region: string
    postal_code: string
    country: string
    created_at: string
  }
  location_venue: string
  shifts: {
    id: string
    name: string
    start_at: string
    end_at: string
  }[]
  petition: {
    slug: string
    url: string
  }
  labels: string[]
}

// ControlShift Labs event API response (using authenticated API) - This one will return ALL events
type CSLEventResponse = {
  events: CSLEvent[]
  meta: {
    current_page: number
    total_pages: number
    previous_page: number | null
    next_page: number | null
  }
}

// ControlShift Labs local point (using public API)
type CSLLocalPoint = {
  type: 'Event' | 'Group'
  id: number
  slug: string
  title: string
  description: string
  virtual: boolean
  start_at: string
  start_tz: string
  end_at: string | null
  end_tz: string | null
  hiddenAddress: boolean
  public_path: string
  image_url: string
  attendees_count: number
}

type CSLLocalPointResponse = {
  data: CSLLocalPoint[]
  meta: {
    count: number
    page: number
    per_page: number
    total_pages: number
    filter: {
      searched_location: string
    }
  }
}

const exampleEvents: Event[] = [
  {
    coordinates: {
      latitude: 52.37825039999999,
      longitude: 4.9134354,
    },
    date: '2025-04-22',
    title: 'Voer mee actie bij de AVA van ING!',
    slug: 'ava-seizoen-2025-ing',
  },
  {
    coordinates: null,
    date: '2025-06-03',
    title: 'Kom naar de pre-ALV',
    slug: 'pre-alv-2024',
  },
  {
    coordinates: {
      latitude: 52.07521209999999,
      longitude: 5.121321000000001,
    },
    date: '2025-06-14',
    title: 'Meld je aan voor onze Algemene Ledenvergadering',
    slug: 'alv',
  },
  {
    coordinates: {
      latitude: 52.3334487,
      longitude: 4.9171106,
    },
    date: '2025-05-10',
    title: ' Veranderaarsacademie - Masterclass',
    slug: 'veranderaarsacademie-masterclass-1',
  },
  {
    coordinates: {
      latitude: 52.3438475,
      longitude: 4.7063326,
    },
    date: '2025-07-05',
    title: 'Bulderbos Onderhoudsdag',
    slug: 'bulderbos-onderhoudsdag',
  },
  {
    title: 'Maak kennis met Milieudefensie 👋',
    date: '2025-04-23T18:00:00Z',
    slug: 'online-introductie-welkom-bij-milieudefensie-40',
  },
  {
    title: 'Maak kennis met Milieudefensie 👋',
    date: '2025-04-30T18:00:00Z',
    slug: 'online-introductie-welkom-bij-milieudefensie-41',
  },
  {
    title: 'MD Utrecht: Klimaatcafé en pubquiz over duurzaam reizen!',
    date: '2025-05-08T18:00:00Z',
    slug: 'md-utrecht-klimaatcafe-en-pubquiz-over-duurzaam-reizen',
    coordinates: {
      latitude: 52.0953333,
      longitude: 5.1168333,
    },
  },
  {
    title: 'Ledenavond: Sneak Preview Meerjarenstrategie',
    date: '2025-05-06T18:00:00Z',
    slug: 'ledenavond-sneak-preview-meerjarenstrategie',
  },
  {
    title: 'Klimaatcafé Zwolle: KlimaatGesprekken',
    date: '2025-05-09T18:00:00Z',
    slug: 'klimaatcafe-md-zwolle-klimaatgesprekken',
    coordinates: {
      latitude: 52.5067975,
      longitude: 6.0990397,
    },
  },
  {
    title: 'TEST waitinglist',
    date: '2025-08-29T07:00:00Z',
    slug: 'test-waitinglist',
  },
  {
    title: 'test external link',
    date: '2025-09-12T07:00:00Z',
    slug: 'test-external-link',
  },
  {
    title: 'Workshop voedsel & Ahold: maak impact met storytelling ✨',
    date: '2025-04-24T16:00:00Z',
    slug: 'ahold-delhaize-storytelling-workshop',
    coordinates: {
      latitude: 52.0929579,
      longitude: 5.1121901,
    },
  },
  {
    title: 'TEST staff led',
    date: '2025-09-14T13:00:00Z',
    slug: 'test-staff-led',
  },
  {
    title: 'Maak kennis met Milieudefensie 👋',
    date: '2025-05-07T18:00:00Z',
    slug: 'maak-kennis-met-milieudefensie',
  },
  {
    title: 'Maak kennis met Milieudefensie 👋',
    date: '2025-05-14T18:00:00Z',
    slug: 'maak-kennis-met-milieudefensie-1',
  },
  {
    title: 'Maak kennis met Milieudefensie 👋',
    date: '2025-05-21T18:00:00Z',
    slug: 'maak-kennis-met-milieudefensie-2',
  },
  {
    title: 'Maak kennis met Milieudefensie 👋',
    date: '2025-05-28T18:00:00Z',
    slug: 'maak-kennis-met-milieudefensie-3',
  },
  {
    title: 'Ledenavond: Sneak Preview Meerjarenstrategie',
    date: '2025-05-06T18:00:00Z',
    slug: 'ledenavond-sneak-preview-meerjarenstrategie-1',
  },
  {
    title: 'Klimaatcafé Groningen: Voedsel',
    date: '2025-05-23T17:30:00Z',
    slug: 'klimaatcafe-groningen-voedsel',
    coordinates: {
      latitude: 53.2336247,
      longitude: 6.5596403,
    },
  },
]

export default defineEventHandler(async (event) => {
  if (process.dev) {
    return exampleEvents
  } else {
    let events: Event[] = []

    const dato = await fetchDatoEvents()

    const allCSLEvents = await fetchAllCSLEvents()

    events = dato.data.allEvents

    // First, we need to get all events, including non-public and deleted ones. This is required, becuse the public CSL API does not return event coordinates. After that, we'll filter this full list by the ones that are public (using the public API).
    const publicEventSlugs = await fetchPublicEventSlugs()

    allCSLEvents.forEach((event) => {
      if (publicEventSlugs.includes(event.slug)) {
        // This is a public event, so we'll show it on the map
        events.push(event)
      }
    })

    return events
  }
})

async function fetchDatoEvents() {
  try {
    const dato: DatoCMSResponse = await $fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${config.datoSecret}`,
      },
      body: {
        query: `query AllGroups {
        allEvents (
          first: 500
          filter:  {
            date:  {
              gt: "${new Date().toISOString()}"
            }
          }
        ) {
          coordinates {
            latitude
            longitude
          }
          date
          title
          slug
        }
      }`,
      },
    })

    return dato
  } catch (error) {
    console.error('Error fetching DatoCMS events:', error)
    throw error // Rethrow the error to be handled by the caller
  }
}

async function fetchAllCSLEvents() {
  let currentPage: number | null = 1

  let numberOfRuns = 1
  let events: Event[] = []

  while (currentPage && numberOfRuns < 50) {
    numberOfRuns++

    try {
      // Fetch the current page's data

      const csl: CSLEventResponse = await $fetch(
        `https://lokaal.milieudefensie.nl/api/v1/events?page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            authorization: `Bearer ${config.cslSecret}`,
          },
        }
      )

      csl.events.forEach((event) => {
        const today = new Date()
        const eventDate = new Date(event.start_at)
        if (eventDate > today) {
          let coordinates
          if (event.location) {
            coordinates = {
              latitude: parseFloat(event.location.latitude),
              longitude: parseFloat(event.location.longitude),
            }
          }
          events.push({
            title: event.title,
            date: event.start_at,
            slug: event.slug,
            coordinates,
          })
        }
      })

      // Get the URL for the next page, if it exists
      currentPage = csl.meta.next_page || null
    } catch (error) {
      console.error('Error fetching events:', error)
      break // Exit loop on error
    }
  }

  return events
}

// Using the CSL local points API, we can determine which local points are upcoming and not cancelled or hidden for some reason.
async function fetchPublicEventSlugs() {
  let currentPage = 1
  let totalPages = 1
  let eventSlugs: string[] = []

  while (currentPage <= totalPages && currentPage < 50) {
    try {
      // Fetch the current page's data
      const csl: CSLLocalPointResponse = await $fetch(
        `https://lokaal.milieudefensie.nl/api/local.json?page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            authorization: `Bearer ${config.cslSecret}`,
          },
        }
      )

      totalPages = csl.meta.total_pages

      csl.data.forEach((localPoint) => {
        const today = new Date()
        const eventDate = new Date(localPoint.start_at)
        if (localPoint.type === 'Event') {
          eventSlugs.push(localPoint.slug)
        }
      })

      currentPage++
    } catch (error) {
      console.error('Error fetching events:', error)
      break // Exit loop on error
    }
  }

  return eventSlugs
}
