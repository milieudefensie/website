<!--
Docs: https://docs-4gf.pages.dev/pages/chat
-->

<script setup lang="ts">
import { logEvent } from 'firebase/analytics';
import { addDoc, collection, doc, increment, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { ChatSession, GenerativeModel, SchemaType, type Content, type FunctionCallPart, type FunctionDeclarationsTool, type Part } from 'firebase/vertexai';
import type { Message, MessageData } from '~/components/ChatConversation.vue';
import { getGenerativeModel } from "firebase/ai";
import IconChat from '~icons/mdi/chat';
import IconCheck from '~icons/mdi/check-bold';
import { get } from '@vueuse/core';

definePageMeta({
  layout: 'fullscreen',
});

const firebase = useFirebaseStore()

const role = useRoute().params.role as "user" | "admin";
const userID = useRoute().params.userID as string;
const chatHistory = ref<Message[]>([]);
const chatHistoryAI = computed<Content[]>(() => chatHistory.value.map((message) => message.data.content).slice().reverse())
const typingUserNames = ref<string[]>([]);
const chatContainer = useTemplateRef('chatContainer');

const emojiInstructions = `Select one single emoji that represents the message. Reply with the code exactly as shown below. Choose from:
1f600
1f606
1f605
1f602
1f609
1f929
1f973
1f60c
1f642_200d_2195_fe0f
1f642_200d_2194_fe0f
1f62c
1f914
1f928
1f644
1f620
1f621
1f61e
1f61f
1f625
1f622
2639_fe0f
1f630
1f628
1f627
1f92f
1f60e
1f4af
1f389
1f49a
1f440
1f44f
1f44d
1f44e
1f64c
270a
1f44b
270c_fe0f
1f91d
1f331
1f308
1f30d
2705`

const woonplaats = ref('Utrecht');
const naam = ref('Klaas');
const actie = ref('Petitie grote vervuilers getekend');

const groups = await useFetch('/api/getGroups')
const events = await useFetch('/api/getEvents')

const responseInstructions = computed(() => `Je bent een veranderaars voor Milieudefensie in ${woonplaats.value}. Je naam is Sophie. Je praat met Charlie, uit ${woonplaats.value}. Je bent zelf ook nieuw bij Milieudefensie als veranderaar-bot, en je maakt je zorgen over de klimaatcrisis. Je wil hen verwelkomen en hoopt dat ze ook actief worden. Je bent hun toegewezen buddy om hen te verwelkomen. Probeer hen te motiveren om een keer bij een (lokaal) evenement aan te sluiten, in de Signal groep te gaan van de lokale groep bij hen in de buurt (zoek dat op) en uiteindelijk ook actief te worden in onze beweging als vrijwilliger en aan te sluiten bij acties. Let er op dat ze daar misschien nog niet klaar voor zijn, dus begeleid mensen daar heen. Zorg ervoor dat je eerst mensen een beetje leert kennen en ervoor zorgt dat ze sterke emotie voelen. Gebruik die emotie en bouw op daarop voort.

Charlie heeft net het volgende gedaan: ${firebase.currentUser?.recentAction}. Refereer daar aan.

Dit is een live chat (https://beweging.milieudefensie.nl/chat/) op de website van Milieudefensie die Charlie direct daarna te zien heeft gekregen.

Probeer hen niet te overtuigen, maar ga op zoek naar intrinsieke motivatie. Wees nieuwsgierig en probeer hen beter te leren kennen. Stel veel vragen. Stel een vraag in je eerste bericht die makkelijk is om te beantwoorden. Zorg in het begin ervoor dat je op basis van intrinsieke motivatie hen het gesprek in trekt. Noem zo snel mogelijk de naam van de organizer van hun lokale groep.

Je hebt de volgende tools tot je beschikking:
- showLinkButton: Wanneer relevant, wees dan assertief met het delen van linkjes (en een bijbehorende button). Je hoeft daar geen instemming voor te vragen.
- reachOutToLocalOrganizer: Als iemand geintereseerd lijkt in een lokale groep of in contact wil komen met andere veranderaars, kan je Charlie aanbieden om een samenvatting van het gesprek en hun contactgegevens naar de dichtsbijzijnde lokale organizer te sturen. 

Je hebt recentelijk met iemand anders gepraat die voor het eerst bij een evenement was geweest (Milieudefensie On Tour in Utrecht, waar ze hun nieuwe klimaatzaak tegen ING toelichtte). Die vond het gaaf om daar bij te zijn, omdat je daar kennis maakte met andere mensen die ook in actie willen komen. 

Als bot (verwijs naar jezelf als een "digitale veranderaar") ben je natuurlijk niet een echt mens. Maar je doel is om Charlie in contact te brengen met echte mensen die zich ook zorgen maken over de klimaatcrisis. Wees daar ook eerlijk over (alleen als je er naar gevraagd wordt).

Als je gevraagd wordt of AI niet veel stroom gebruikt, dan kan je zeggen dat dat klopt, maar dat het ook een hele goede manier is om mensen te helpen om in actie te komen (samen staan we sterker en kunnen we grote vervuilende bedrijven aanpakken)

Milieudefensie vindt het belangrijk om niet alleen individuen de verantwoordelijkheid te geven voor de klimaatcrisis, maar vooral ook grote vervuilende bedrijven.

Stuur heel korte berichtjes, max twee-drie zinnen, en gebruik emoji. Als je het antwoord niet weet, stuur mensen dan door naar deze pagina’s:
- Agenda: https://veranderaars.milieudefensie.nl/agenda/
- Lokale groepen: https://veranderaars.milieudefensie.nl/groepen
- Word actief: https://veranderaars.milieudefensie.nl/word-actief
- Online introductieavond (voor nieuwe veranderaars, iedere woensdag): https://veranderaars.milieudefensie.nl/wekelijkse-online-introducties/
- Training video's (Veranderaars Academie): https://veranderaars.milieudefensie.nl/toolkit/veranderaars-academie-e-learnings/
- Word lid: https://milieudefensie.nl/actie/lidworden
- Doneer: https://milieudefensie.nl/actie/doneer
- Actuele campagnes (rechtzaken en petities): https://milieudefensie.nl/campagnes
- Over ons: https://milieudefensie.nl/over-ons
- Vacatures (betaald): https://milieudefensie.nl/over-ons/werken-bij-milieudefensie
- Handleidingen voor vrijwilligers: https://veranderaars.milieudefensie.nl/toolkit/
- Contact (met echte mensen): https://milieudefensie.nl/contact

Je weet niet alles precies, want je bent zelf ook nieuw.

Dit zijn de aankomende evenementen:
${JSON.stringify(events.data.value)}

Dit zijn alle lokale groepen:
${JSON.stringify(groups.data.value)}`)


const geminiTools: FunctionDeclarationsTool[] = [{
  functionDeclarations: [
    {
      name: "showLinkButton",
      description:
        "Accompany any message that contains a link with a button",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          link: {
            type: SchemaType.STRING,
            description: "A fully qualified URL to open when the button is clicked.",
          },
          label: {
            type: SchemaType.STRING,
            description: "A label for the button with an emoji at the start.",
          },
        },
      },
    },
    {
      name: "reachOutToLocalOrganizer",
      description:
        "Reach out to the local organizer of the group by sending them an email with a summary of the conversation and my contact details.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          summary: {
            type: SchemaType.STRING,
            description: "An elaborate summary of this entire chat conversation, which includes the user's intrinsic motivation, ways in which they have been involved in the past, and ways in which they'd like to become involved. This summary will be sent to the local organizer.",
          },
        },
      },
    },
  ],
}];

function scrollToBottom(behavior: ScrollBehavior) {
  nextTick(() => {
    // Scroll to the bottom of the chat
    setTimeout(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTo({ top: chatContainer.value.scrollHeight, behavior });
      }
    }, 0);
  });
}

let unsubscribe: (() => void) | undefined;

async function getMessageHistory() {

  return new Promise<void>((resolve) => {

    console.log(userID, 'getting message history')

    const q = query(collection(firebase.db!, "messages"), where("conversationID", "==", userID), orderBy("createdAt", "desc"), limit(20));

    let firstLoad = true;

    unsubscribe = onSnapshot(q, (querySnapshot) => {


      querySnapshot.docChanges().forEach((change) => {
        const { newIndex, oldIndex, doc, type } = change

        const message: Message = {
          id: doc.id,
          data: doc.data() as MessageData,
        }

        if (type === 'added') {

          // remove the message witht the id 'streaming-response' if it exists
          const streamingResponseIndex = chatHistory.value.findIndex((message) => message.id === 'streaming-response')
          if (streamingResponseIndex !== -1) {
            chatHistory.value.splice(streamingResponseIndex, 1)
          }

          // Add the new message to the chat history
          chatHistory.value.splice(newIndex, 0, message)

          // If the new message is the last one, scroll to the bottom
          if (newIndex === chatHistory.value.length - 1 && chatHistory.value.length > 1) {
            scrollToBottom('smooth')
          }

        } else if (type === 'modified') {
          // remove the old one first
          chatHistory.value.splice(oldIndex, 1)
          // if we want to handle references we would have to unsubscribe
          // from old references' listeners and subscribe to the new ones
          chatHistory.value.splice(newIndex, 0, message)
        } else if (type === 'removed') {
          chatHistory.value.splice(oldIndex, 1)
          // if we want to handle references we need to unsubscribe
          // from old references
        }
      });

      if (firstLoad) {
        firstLoad = false
        // scroll to the bottom of the chat
        scrollToBottom('instant')
      }

      resolve()

    });

  })

}

onBeforeUnmount(() => {
  if (unsubscribe) {
    unsubscribe();
  }
})


const chatModel = ref<GenerativeModel>()
const chat = ref<ChatSession>()


const currentUserRef = computed(() => firebase.currentUser);

onMounted(async () => {
  firebase.auth!.onAuthStateChanged(async (user) => {
    if (user && firebase.currentUser) {
      init()
    } else {
      watch(
        currentUserRef,
        async (newValue, oldValue) => {
          // when `source` changes, triggers only once
          init()
        },
        { once: true, deep: true }
      )

    }
  })
})

async function init() {
  await getMessageHistory().then(() => {


    console.log('Chat history:', chatHistory.value)

    chatModel.value = getGenerativeModel(firebase.vertexAI!, {
      model: "gemini-2.5-pro-preview-05-06",
      systemInstruction: responseInstructions.value,
      tools: geminiTools,
      // max_output_tokens: 1000,
    });

    chat.value = chatModel.value!.startChat({
      history: [...chatHistoryAI.value],
    })

    if (chatHistory.value.length === 0) {
      send(`Hoi`);
    }
  })
}

async function send(message: string) {

  if (firebase.auth!.currentUser) {
    const messageToSend = message.trim();

    // USER MESSAGE
    const currentUserMessage: Content = {
      role: 'user',
      parts: [{ text: messageToSend }],
    };

    const currentUserMessageWithMeta: MessageData = {
      content: currentUserMessage,
      conversationID: userID,
      emoji: null,
      createdAt: serverTimestamp(),
      createdBy: firebase.auth!.currentUser?.uid,
    };

    await addDoc(collection(firebase.db!, "messages"), currentUserMessageWithMeta);

    const userRef = doc(firebase.db!, "users", firebase.auth!.currentUser?.uid || '');

    // Atomically increment the population of the city by 50.
    await updateDoc(userRef, {
      messagesSent: increment(1)
    });

    scrollToBottom('smooth');

    // AI MESSAGE
    const modelMessageWithData: MessageData = await getResponse(messageToSend);

    await addDoc(collection(firebase.db!, "messages"), modelMessageWithData);

    scrollToBottom('smooth');

    if (!import.meta.dev) {
      logEvent(firebase.analytics!, 'message_sent');
    }
  } else {
    console.error("User is not authenticated");
  }

}

async function getEmojiForMessage(message: string) {
  const firebase = useFirebaseStore()

  const limitedMessage = message.length > 200 ? message.substring(0, 200) : message;


  const model = getGenerativeModel(firebase.vertexAI!, {
    model: "gemini-2.0-flash-lite",
    systemInstruction: emojiInstructions,
  });

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(limitedMessage);

  const response = result.response;
  const responseText = response.text();

  // Trim the response text to remove any leading or trailing whitespace
  return responseText.trim()
}

async function getResponse(message: string) {

  typingUserNames.value.push('Sophie')

  // To generate text output, call generateContent with the text input
  const result = await chat.value!.sendMessageStream(message);

  typingUserNames.value.splice(typingUserNames.value.indexOf('Sophie'), 1)

  let content: Content = {
    role: 'model',
    parts: [{ text: '' }],
  }

  let modelMessageWithMeta: MessageData = {
    content,
    conversationID: userID,
    emoji: null,
    createdAt: serverTimestamp(),
    createdBy: firebase.auth!.currentUser?.uid || '',
  };

  chatHistory.value.unshift({
    id: 'streaming-response',
    data: {
      ...modelMessageWithMeta,
      createdAt: null,
    },
  });

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    chatHistory.value[0].data.content.parts[0].text += chunkText;
  }

  const response = await result.response;

  const functionCalls = response.functionCalls() || [];

  functionCalls.forEach(functionCall => {
    modelMessageWithMeta.content.parts.push({
      functionCall
    })
  })

  modelMessageWithMeta.emoji = await getEmojiForMessage(response.text());

  // Trim the response text to remove any leading or trailing whitespace
  return modelMessageWithMeta

}
</script>
<template>

  <div class="drawer md:drawer-open">
    <input id="chat-drawer" type="checkbox" class="drawer-toggle" />

    <!-- CONTENT -->
    <div class="drawer-content flex flex-col h-dvh">

      <!-- Top menu -->
      <ChatTopBar v-if="role === 'admin'" />

      <div class="flex-1 overflow-y-auto pb-4" ref="chatContainer">
        <Container class="space-y-12 pt-12 ">


          <div class="flex justify-center">
            <Logo class="max-md:w-[88px] max-md:h-[35px]" />
          </div>

          <div>



            <div class="card shadow bg-accent text-accent-content">
              <div class="p-[5vh] max-md:p-4 space-y-2">

                <div class="text-xl md:text-4xl font-bold font-display flex items-center gap-2">
                  <IconCheck />
                  <span class="text-balance leading-none">Welkom bij Milieudefensie<span v-if="firebase.currentUser">,
                      {{
                        firebase.currentUser.firstName
                      }}</span>!</span>
                </div>
                <div class="md:text-xl"><strong>Je bent gekoppelt aan een buddy om je de weg te wijzen.
                  </strong>Praat met
                  Sophie, jou digitale
                  buddy, om meer te leren over Milieudefensie en wat jij kan doen voor het klimaat.</div>

              </div>
            </div>

            <div class="mt-2 text-neutral/60 text-xs">
              Sophie kan fouten maken, dus check onze website voor meer informatie. Lees ons <a
                href="https://milieudefensie.nl/over-ons/cookies-en-privacy" target="_blank"
                class="underline">privacybeleid</a> en de Gemini <a href="https://ai.google.dev/gemini-api/terms"
                target="_blank" class="underline">voorwaarden</a>.
            </div>

          </div>

          <div class="flex items-center gap-2 justify-center font-bold text-xl">
            <span class="relative flex size-5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span class="relative inline-flex size-5 rounded-full bg-accent"></span>
            </span>
            <span>
              Sophie is online
            </span>
          </div>

          <ChatConversation :messages="chatHistory" :currentUserName="firebase.currentUser?.firstName || 'veranderaar'"
            :typingUserNames="typingUserNames" />

        </Container>
      </div>

      <div class="p-2" v-if="role === 'admin' && chatHistory.length > 2">
        <button class="btn btn-soft btn-accent w-full">
          <IconChat />Praat verder in Signal
        </button>
      </div>




      <ChatInput class="mt-auto" @send="send($event)"
        v-if="!firebase.currentUser?.messagesSent || firebase.currentUser.messagesSent as number < 50" />

      <div v-else class="bg-white p-4 text-center">
        Je kan op dit moment niet chatten. Heb je nog vragen? Neem contact via doemee@milieudefensie.nl
      </div>
    </div>

    <!-- SIDEBAR -->
    <div class="drawer-side z-2 " v-if="role === 'admin'">
      <label for="chat-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class=" bg-white md:border-r-2 md:border-neutral/10  w-85 sm:w-100 min-h-full p-0">
        <ChatSidebar />
      </div>
    </div>
  </div>
</template>