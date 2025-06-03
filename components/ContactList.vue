<script setup lang="ts">
import IconCall from '~icons/mdi/call';
import IconChat from '~icons/mdi/chat';
import IconEdit from '~icons/mdi/edit';

export type Contact = {
  id: number;
  name: string;
  notes?: string;
  phone: string;
  allowedToCall: boolean; // Optional property to indicate if the person can be called
};

export type ContactListProps = {
  contacts: Contact[],
}

const emit = defineEmits<{
  edit: [contact: Contact],
  call: [contact: Contact]
  message: [contact: Contact]
}>()

const props = defineProps<ContactListProps>()

</script>
<template>
  <ul class="list rounded-box shadow-md bg-white">

    <li class="list-row flex justify-between items-center" v-for="person in props.contacts" :key="person.name">
      <div>
        <div class="font-bold">{{ person.name }}</div>
        <div class="max-sm:text-xs">{{ person.notes }}</div>
        <div v-if="!person.allowedToCall" class="text-neutral/70 text-xs italic">Je kan deze persoon niet meer
          bellen.
        </div>
      </div>

      <div class="flex gap-2 items-center">

        <button class="btn btn-circle max-sm:btn-sm" @click="emit('edit', person)">
          <IconEdit />
        </button>
        <div>
          <button class="btn btn-circle max-sm:btn-sm btn-accent" @click="emit('message', person)"
            :disabled="!person.allowedToCall">
            <IconChat />
          </button>
        </div>
        <NuxtLink class="btn btn-circle max-sm:btn-sm btn-accent" to="tel:+31612345678" @click="emit('call', person)"
          :class="{ 'btn-disabled': !person.allowedToCall }">
          <IconCall />
        </NuxtLink>

      </div>
    </li>
  </ul>
</template>