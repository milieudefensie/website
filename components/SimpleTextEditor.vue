<script setup lang="ts">

import { Editor, EditorContent, Extension } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder'

const editor = ref<Editor>()

const emit = defineEmits<{
  send: [message: string]
}>()

export type SimpleTextEditorProps = {
  placeholder: string,
}


const props = defineProps<SimpleTextEditorProps>()

const Enter = Extension.create({
  name: 'enter',
  addKeyboardShortcuts() {
    return {
      // ↓ your new keyboard shortcut
      'Shift-Enter': ({ editor }) => {
        console.log('Shift-Enter pressed')
        return editor.commands.first(({ commands }) => [
          // () => commands.newlineInCode(),
          // () => commands.splitListItem("listItem"), // This line added
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ])
      },
      'Enter': ({ editor }) => {
        console.log('Enter pressed')
        emit('send', editor.getText())
        return true
      }
    }
  },
})

onMounted(() => {
  editor.value = new Editor({
    editorProps: {
      attributes: {
        class: 'prose md:prose-xl focus:outline-none max-w-full',
      },
    },
    content: ``,
    extensions: [
      Document,
      Paragraph,
      Text,
      Enter,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: props.placeholder
      })
    ],
  })


})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

</script>

<template>
  <EditorContent :editor="editor" class="w-full outline-none" />
</template>
<style>
.tiptap p.is-editor-empty:first-child::before {
  color: var(--color-neutral-500);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>