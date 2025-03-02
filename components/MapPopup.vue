<template>
  <button class="btn" @click="openDialog()">open modal</button>
  <dialog id="my_modal_2" class="modal" ref="dialog" @close="closeDialog()">
    <div
      class="modal-box h-full w-full max-h-full max-w-full sm:h-auto sm:w-11</div>/12 sm:max-w-4xl sm:max-h-11/12 p-0">

      <form method="dialog">
        <button class="btn btn-sm btn-circle  absolute right-2 top-2 z-10">
          <IconClose />
        </button>

      </form>
      <ContentCards :cards="[{
        title: props.marker?.title || '',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit assumenda dolores ea, ducimus id distinctio dolore, aliquam libero aspernatur sed illo cupiditate repellendus a maiores placeat vel, iusto iure aut?',
        buttonSize: 'md',
        buttons: [{
          label: 'Meld je aan voor groep',
          color: 'primary',
          style: 'default',
          width: 'default'
        }],

        // image: '/jong.jpg',
        // alt: 'Leiden'
      }]" columns="1" :reverse="false" />

    </div>
    <form method="dialog" class="modal-backdrop ">
      <button>close</button>
    </form>
  </dialog>
</template>
<script lang="ts" setup>
import IconClose from '~icons/mdi/close'

import type { MapMarker } from './Map.vue';

export type MapPopupProps = {
  marker?: MapMarker,
  open: boolean
}

const emit = defineEmits(['popupOpened', 'popupClosed'])
const props = defineProps<MapPopupProps>()

const dialog = ref<HTMLDialogElement>()

function openDialog() {
  dialog.value?.showModal()
  emit('popupOpened')
}

function closeDialog() {
  dialog.value?.close()
  emit('popupClosed')
}

dialog.value?.open

onMounted(() => {
  // When the props.marker changes and gets a value, open the dialog
  watch(() => props.open, (open) => {
    console.log('open', open)
    if (open) {
      openDialog()
    } else {
      closeDialog()
    }
  })

  // watch(() => dialog.value?.open, (open) => {
  //   console.log('dialog open', open)
  //   if (open) {
  //     emit('popupOpened')
  //   } else {
  //     emit('popupClosed')
  //   }
  // })

})
</script>