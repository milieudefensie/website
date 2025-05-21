<script setup lang="ts">
import IconSend from '~icons/mdi/send'

import { Howl } from 'howler';
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

import { Editor, EditorContent, Extension } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder'

const editor = ref<Editor>()

const emit = defineEmits<{
  send: [message: string]
}>()

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
        send()
        return true
      }
    }
  },
})

onMounted(() => {
  editor.value = new Editor({
    editorProps: {
      attributes: {
        class: 'prose md:prose-xl focus:outline-none py-6 px-2 max-w-full',
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
        placeholder: 'Schrijf een bericht...',
      })
    ],
  })


})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

function send() {
  if (editor.value && !editor.value?.isEmpty) {
    // Get the message content of the editor as HTML
    const content = editor.value.getHTML()

    // Emit the message content to the parent component
    emit('send', content)

    // Clear the field
    editor.value?.commands.clearContent()

    // Set the focus back to the editor
    editor.value.commands.focus()

    confetti()
  }
}

function confetti() {
  gsap.registerPlugin(Physics2DPlugin);

  // Processed bit of 212432__qubodup__wobbly-plastic-disk.flac by Timbre -- https://freesound.org/s/212446/ -- License: Attribution NonCommercial 4.0
  // Wobbly Plastic Disk by qubodup-- https://freesound.org/s/212432/ -- License: Attribution 4.0

  // Inspirationf for later: https://freesound.org/people/onikage22/sounds/240566/
  const sound = new Howl({
    src: ['/sounds/send-message.mp3']
  });

  sound.play();


  // Generate a random number of dots
  const dotCount = gsap.utils.random(10, 30, 1);
  const colors = ["var(--color-accent)", "var(--color-primary)"]; // Define colors once

  const button = document.querySelector('.jump-animation') as HTMLElement | null;
  if (button) {
    // Animate the button with a quick jump
    gsap.fromTo(
      button,
      { y: 5, scale: 1 },
      {
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(button, {
            y: 2,
            scale: 1,
            duration: 0.22,
            ease: "bounce.out"
          });
        }
      }
    );
  }

  for (let i = 0; i < dotCount; i++) {
    // Create a dot element
    const dot = document.createElement("div");
    dot.classList.add("dot");

    // Append the dot to the body
    document.body.appendChild(dot);

    const positionXYSendButton = document.querySelector('.btn-accent')?.getBoundingClientRect();

    const middlePostionButton = {
      x: positionXYSendButton?.x + (positionXYSendButton?.width / 2),
      y: positionXYSendButton?.y + (positionXYSendButton?.height / 2)
    }
    // Set initial position and styles of the dot
    gsap.set(dot, {
      backgroundColor: gsap.utils.random(colors), // Pick a random color
      top: middlePostionButton.y, // position dot at coordinates of the click
      left: middlePostionButton.x,
      scale: 0 // Start at scale 0
    });

    // Animate the dot with physics2D
    gsap
      .timeline({
        onComplete: () => dot.remove() // Remove the dot after animation
      })
      .to(dot, {
        scale: gsap.utils.random(0.3, 1), // Scale between 0.5 and 1
        duration: 0.4, // Quick pop-in effect
        ease: "power3.out"
      })
      .to(
        dot,
        {
          duration: 1.1,
          physics2D: {
            velocity: gsap.utils.random(500, 1200), // Random velocity
            angle: gsap.utils.random(220, 360), // Random direction
            gravity: 2000 // Gravity effect
          },
          autoAlpha: 0, // Fade out towards the end
          ease: "none"
        },
        "<"
      ); // Start together with the previous tween
  }

}
</script>

<template>
  <div class="flex border-t-2 border-neutral/10 bg-white gap-2 px-2 items-center">


    <EditorContent :editor="editor" class="w-full outline-none" />
    <div class="jump-animation">
      <button class="btn btn-lg btn-accent max-md:btn-circle active:scale-90 transition-transform" @click="send()">
        <IconSend /> <span class="max-md:hidden">Verstuur</span>
      </button>
    </div>

  </div>
</template>
<style>
.tiptap p.is-editor-empty:first-child::before {
  color: var(--color-neutral-500);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.dot {
  position: fixed;
  background-color: #0ae448;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  will-change: transform, opacity;
  pointer-events: none;
}
</style>