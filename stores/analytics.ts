import { defineStore } from 'pinia'

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    count: 0,
    name: 'Eduardo',
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    init() {
      this.count++
    },
  },
})
