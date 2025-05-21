<script lang="ts" setup>
import { logEvent } from 'firebase/analytics';
import { FieldValue, Timestamp } from 'firebase/firestore';
import type { Content } from 'firebase/vertexai';



export type MessageData = {
  content: Content
  emoji: string | null,
  conversationID: string,
  createdBy: string,
  createdAt: Timestamp | FieldValue
}

export type Message = {
  id: string,
  data: MessageData
}

export type ChatConversationProps = {
  messages: Message[],
  currentUserName: string,
  typingUserNames: string[], // List of typing users
}

const firebase = useFirebaseStore()
const props = defineProps<ChatConversationProps>()

function replacedNames(text: string) {
  return text.replaceAll("Charlie", props.currentUserName);
}

function trackButtonClick(label: string, link: string) {
  if (!import.meta.dev) {
    logEvent(firebase.analytics!, 'message_button_clicked', {
      button_label: label,
      button_link: link,
    });
  }
}


</script>
<template>
  <TransitionGroup name="chat-message" tag="div" class="flex flex-col gap-2">
    <div v-for="(message, index) in messages.slice().reverse()" :ref="message.id" :key="message.id" :class="{
      'recent-message': !message.data.createdAt || (message.data.createdAt as Timestamp)?.toMillis() > (Date.now() - 1000),
    }">
      <div v-for="part in message.data.content.parts" :class="{
        'hidden': part.text === 'Hoi',

        'p-4 gap-2 flex': part.functionCall
      }">
        <!-- MESSAGE TEXT -->


        <div v-if="part.text" class="chat" :class="{
          'chat-end': message.data.content.role === 'user',
          'chat-start': message.data.content.role === 'model',
        }">

          <div class="chat-image avatar" v-if="message.data.content.role === 'model'">
            <div class="w-10 overflow-show">
              <!-- <span>{{ message.data.emoji }}</span> -->
              <picture>
                <source :srcset="`https://fonts.gstatic.com/s/e/notoemoji/latest/${message.data.emoji}/512.webp`"
                  type="image/webp">
                <img :src="`https://fonts.gstatic.com/s/e/notoemoji/latest/${message.data.emoji}/512.gif`">
              </picture>

            </div>
          </div>






          <div class="chat-bubble" :class="{
            'chat-bubble-accent': message.data.content.role === 'user',
          }">
            <Markdown :markdown="replacedNames(part.text)" />
          </div>
        </div>

        <!-- FUNCTION CALLS -->

        <!-- 1. Show button -->
        <NuxtLink v-if="part.functionCall?.name === 'showLinkButton'" class="btn btn-lg btn-primary"
          :to="(part.functionCall?.args as any).link" target="_blank"
          @click="trackButtonClick((part.functionCall?.args as any).label, (part.functionCall?.args as any).link)">
          {{ (part.functionCall?.args as any).label }}
        </NuxtLink>

        <!-- 2. Reach out to local organizer -->
        <div v-if="part.functionCall?.name === 'reachOutToLocalOrganizer'" class="card bg-white shadow">
          <div class="card-body">
            <h2>Samenvatting verstuurd!</h2>
            <div>{{ (part.functionCall?.args as any).summary }}</div>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>

  <div v-for="typingUser in typingUserNames" class="text-neutral/80 text-xs mt-4">
    <div>{{ typingUser }} is aan het typen...</div>
    <div class="chat chat-start">
      <div class="chat-bubble">
        <div class="typingIndicatorBubble my-2">
          <div class="typingIndicatorBubbleDot"></div>
          <div class="typingIndicatorBubbleDot"></div>
          <div class="typingIndicatorBubbleDot"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.chat-message-enter-from.recent-message .chat-bubble {
  opacity: 0;
  transform: translateY(40px) scale(3);
}

.chat-message-enter-active,
.chat-message-enter-active * {
  transition: all .35s cubic-bezier(0.33, 1, 0.68, 1);
}

.chat-message-enter-to.recent-message .chat-bubble {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.typingIndicatorBubble {
  display: flex;
  align-items: center;
  justify-content: center;
}

.typingIndicatorBubbleDot {
  width: 8px;
  height: 8px;
  margin-right: 4px;
  background-color: #57585a;
  border-radius: 50%;
  animation-name: bounce;
  animation-duration: 1.3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.typingIndicatorBubbleDot:first-of-type {
  margin: 0px 4px;
}

.typingIndicatorBubbleDot:nth-of-type(2) {
  animation-delay: 0.15s;
}

.typingIndicatorBubbleDot:nth-of-type(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {

  0%,
  60%,
  100% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-4px);
  }
}
</style>