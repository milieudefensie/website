<!--
Docs: https://docs-4gf.pages.dev/strategy/pages/chat
-->

<script setup lang="ts">
import { set } from '@vueuse/core';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

definePageMeta({
  layout: 'fullscreen',
});

const route = useRoute()
const firebase = useFirebaseStore()

async function setUserData(userID: string) {
  let firstName = route.query.first_name as string || undefined;
  let email = route.query.email as string || undefined;
  let postcode = route.query.postcode as string || undefined;
  let phone = route.query.phone as string || undefined;
  let recentAction = route.query.action as string || undefined;

  // Correct the following postcode variations 
  // 1234 AB -> 1234AB
  // 1234ab -> 1234AB

  // Trim whitespace from firstName and email
  if (firstName) firstName = firstName.trim()
  if (email) email = email.trim()

  // Remove spaces and convert to uppercase
  if (postcode) postcode = postcode.replaceAll(' ', '').toUpperCase();

  // Check if postcode is valid (4 numbers, 2 letters)
  const postcodeRegex = /^\d{4}[A-Z]{2}$/;
  if (postcode && !postcodeRegex.test(postcode)) {
    // If the postcode is not valid, set it to undefined
    console.warn('Invalid postcode format:', postcode);
    postcode = undefined;
  }

  // Extract parts of the postcode
  let p1 = undefined;
  let p2 = undefined;
  let p3 = undefined;
  let p4 = undefined;
  let p5 = undefined;

  if (postcode) {
    p1 = postcode.slice(0, 1); // First number of the postcode
    p2 = postcode.slice(0, 2); // First two numbers of the postcode
    p3 = postcode.slice(0, 3); // First three numbers of the postcode
    p4 = postcode.slice(0, 4); // First four numbers of the postcode
    p5 = postcode.slice(0, 5); // First four numbers of the postcode
  }

  // Trim whitespace from phone and remove spaces
  if (phone) phone = phone.trim().replaceAll(' ', '');

  // Trim and limit recentAction to 100 characters
  if (recentAction) recentAction = recentAction.trim().slice(0, 100);

  // Only set the user data for the fields that are provided (so that we do not overwrite existing data with empty values)
  const userDB: User = {
    ...(firstName ? { firstName } : {}),
    ...(email ? { email } : {}),
    ...(phone ? { phone } : {}),
    ...(recentAction ? { recentAction } : {}),
    ...(postcode ? {
      postcode: {
        full: postcode,
        p1,
        p2,
        p3,
        p4,
        p5
      },
    } : {}),
    lastOnline: serverTimestamp(),
  }
  await setDoc(doc(firebase.db!, 'users', userID), userDB, { merge: true })
}

onMounted(async () => {

  // Wait for the user to be authenticated
  firebase.auth!.onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in, navigate to the chat page

      await setUserData(user.uid)

      navigateTo(`/chat/user/${user.uid}`)
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