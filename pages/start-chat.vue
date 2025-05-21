<script setup lang="ts">
definePageMeta({
  layout: 'fullscreen',
});


onMounted(() => {
  const firebase = useFirebaseStore()

  // Wait for the user to be authenticated
  const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, navigate to the chat page
      navigateTo(`/chat/${user.uid}`)
      unsubscribe() // Unsubscribe from the listener
    } else {
      // No user is signed in, navigate to the login page
    }
  })
})
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <span class="loading loading-dots loading-xl"></span>
    <div class="text-neutral/70 text-sm">Loading chat...</div>

  </div>


</template>