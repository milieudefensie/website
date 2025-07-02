<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { average, collection, getAggregateFromServer, getCountFromServer } from 'firebase/firestore'
import IconSend from '~icons/mdi/send'
import IconAccountGroup from '~icons/mdi/account-group'
import IconMessageTextOutline from '~icons/mdi/message-text-outline'
import IconForum from '~icons/mdi/forum'
import { showError } from 'nuxt/app'

const firebase = useFirebaseStore()

const totalUsers = ref<number | null>(null)
const totalMessages = ref<number | null>(null)
const averageMessagesPerUser = ref<number | null>(null)
const averageConversationsPerUser = ref<number | null>(null)

definePageMeta({
  layout: 'fullscreen',
});


onMounted(async () => {

  const users = collection(firebase.db!, "users");
  const messages = collection(firebase.db!, "messages");

  try {

    const userCount = await getCountFromServer(users);
    const messagesCount = await getCountFromServer(messages);
    const averageMessagesSent = await getAggregateFromServer(users, { count: average('messagesSent') })
    const averageConversationsStarted = await getAggregateFromServer(users, { count: average('conversationsStarted') })

    totalUsers.value = userCount.data().count;
    totalMessages.value = messagesCount.data().count;
    averageMessagesPerUser.value = averageMessagesSent.data().count;
    averageConversationsPerUser.value = averageConversationsStarted.data().count;

  } catch (error) {
    showError(error as Error)
  }
})
</script>

<template>
  <div class="space-y-6 p-8">
    <h1 class="text-3xl font-bold">Chat Dashboard</h1>
    <div class="stats shadow w-full flex flex-col lg:flex-row">
      <div class="stat bg-white">
        <div class="stat-figure text-primary">
          <IconSend class="inline-block h-8 w-8" />
        </div>
        <div class="stat-title">Aantal berichtjes</div>
        <div class="stat-value text-primary">{{ totalMessages ?? '-' }}</div>
      </div>
      <div class="stat bg-white">
        <div class="stat-figure text-secondary">
          <IconAccountGroup class="inline-block h-8 w-8" />
        </div>
        <div class="stat-title">Aantal gebruikers</div>
        <div class="stat-value text-secondary">{{ totalUsers ?? '-' }}</div>
      </div>
    </div>
    <div class="stats shadow w-full flex flex-col lg:flex-row ">
      <div class="stat bg-white">
        <div class="stat-figure text-accent">
          <IconMessageTextOutline class="inline-block h-8 w-8" />
        </div>
        <div class="stat-title">Berichtjes per veranderaar</div>
        <div class="stat-value text-accent">{{ averageMessagesPerUser ?? '-' }}</div>
      </div>
      <div class="stat bg-white">
        <div class="stat-figure text-info">
          <IconForum class="inline-block h-8 w-8" />
        </div>
        <div class="stat-title">Gesprekken per veranderaar</div>
        <div class="stat-value text-info">{{ averageConversationsPerUser ?? '-' }}</div>
      </div>
    </div>
  </div>

</template>