<script setup lang="ts">
import WhatsAppIcon from '~icons/mdi/whatsapp';
import ShareIcon from '~icons/mdi/share';
import CopyIcon from '~icons/mdi/content-copy';


export interface SignalShareProps {
  message: string;
  color?: "primary" | "secondary" | "accent" | "neutral";
}

const props = defineProps<SignalShareProps>()

const urlEncodedMessage = computed(() => encodeURIComponent(props.message));

const signalModal = useTemplateRef('signalModal');
const messageElement = useTemplateRef('message');


function openSignalModal() {
  // Copy the text inside the text field
  navigator.clipboard.writeText(props.message);

  signalModal.value?.showModal()

}
</script>
<template>

  <div class="flex gap-2 flex-wrap">
    <button class="btn max-md:btn-sm btn-outline " :class="{
      'btn-secondary': props.color === 'secondary',
      'btn-accent': props.color === 'accent',
      'btn-neutral': props.color === 'neutral',
      'btn-primary': props.color === 'primary',
    }" @click="openSignalModal()">
      <ShareIcon class="w-6 h-6 mr-2" />
      Deel op Signal
    </button>
    <NuxtLink class="btn max-md:btn-sm btn-outline " :class="{
      'btn-secondary': props.color === 'secondary',
      'btn-accent': props.color === 'accent',
      'btn-neutral': props.color === 'neutral',
      'btn-primary': props.color === 'primary',
    }" :to="`https://wa.me/?text=${urlEncodedMessage}`" target="_blank">
      <WhatsAppIcon class="w-6 h-6 mr-2" />
      Deel op WhatsApp
    </NuxtLink>

  </div>

  <dialog ref="signalModal" class="modal">
    <div class="modal-box space-y-4">
      <h3 class="text-2xl font-bold flex gap-2">
        <CopyIcon /> <span>Bericht gekopieerd!</span>
      </h3>
      <p class="text-xl">Open Signal, kies naar wie je een berichtje wil sturen, en plak dit bericht:
      </p>
      <p class="p-4 whitespace-pre-wrap border-2 border-secondary rounded-lg italic" ref="message" contenteditable> {{
        message
      }} </p>
      <NuxtLink class="btn btn-secondary w-full btn-lg" to="https://signal.me/#eu" target="_blank"
        @click="signalModal?.close()">Open Signal
      </NuxtLink>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>