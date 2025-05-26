<script lang="ts" setup>

import IconSend from '~icons/mdi/send'


// Import the functions you need from the SDKs you need
import { getFunctions, httpsCallable, type Functions } from 'firebase/functions';
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, signInAnonymously, type Auth } from "firebase/auth";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";
import { Firestore, getFirestore, addDoc, collection, serverTimestamp, query, where, getDocs, orderBy, limit, onSnapshot, Timestamp, FieldValue } from "firebase/firestore";

import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from "firebase/app-check";
import { getVertexAI, getGenerativeModel, ChatSession, GenerativeModel, Schema, type VertexAI, type Content, type Part, type FunctionDeclarationsTool, SchemaType, type ModelParams, type StartChatParams } from "firebase/vertexai";
import type { RequestOptions } from '@directus/sdk';

type DatabaseMessage = Content & {
  createdAt: Timestamp | FieldValue;
  createdBy: string;
};
type LocalDatabaseMessage = DatabaseMessage & {
  id: string;
}

definePageMeta({
  layout: 'fullscreen',
});


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ0PNYSbgMcdhAAlvM_i8EIRuScgoeEJQ",
  authDomain: "milieudefensie-458212.firebaseapp.com",
  projectId: "milieudefensie-458212",
  storageBucket: "milieudefensie-458212.firebasestorage.app",
  messagingSenderId: "944107582121",
  appId: "1:944107582121:web:a9952e912b0bae727dafb8",
  measurementId: "G-M8ZQ47EG55"
};

let firebaseApp: FirebaseApp;
let analytics: Analytics;
let functions: Functions;
let appCheck: AppCheck;
let vertexAI: VertexAI;
let model: GenerativeModel;
let chat: ChatSession;
let db: Firestore;
let auth: Auth;
const chatHistory = ref<LocalDatabaseMessage[]>([])
const chatHistoryGemini = computed(() => {
  return chatHistory.value.map((message) => {
    const newMessage = {
      parts: message.parts,
      role: message.role
    };
    return newMessage;
  });
})

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

onMounted(async () => {

  console.log('systemInstruction', systemInstruction.value)


  if (import.meta.dev) {
    // @ts-ignore https://firebase.google.com/docs/app-check/web/debug-provider
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  // Initialize Firebase
  firebaseApp = initializeApp(firebaseConfig);

  functions = getFunctions(firebaseApp, 'europe-west1');

  auth = getAuth();
  signInAnonymously(auth)
    .then(async (user) => {
      // Signed in..
      await getMessageHistory()

      // Initialize the Vertex AI service
      vertexAI = getVertexAI(firebaseApp);

      const modelParams: ModelParams = {
        model: "gemini-2.5-pro-preview-05-06",
        systemInstruction: systemInstruction.value,
        tools: geminiTools,
      };


      // Create a `GenerativeModel` instance with a model that supports your use case
      model = getGenerativeModel(vertexAI, modelParams);

      const StartChatParams: StartChatParams = {
        history: chatHistoryGemini.value,
        generationConfig: {
          maxOutputTokens: 1000,
        },
      };

      chat = model.startChat(StartChatParams);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
      // ...
    });

  analytics = getAnalytics(firebaseApp);

  appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider('6LdG1TwrAAAAAJ-YI0nCvbmk2Yb3-sn-JQnYD-tk'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
  });



  db = getFirestore(firebaseApp);

})


// UI
const started = ref(false);
const woonplaats = ref('Utrecht');
const naam = ref('Klaas');
const actie = ref('Petitie grote vervuilers getekend');
const userMessage = ref('');
const userMessageInput = useTemplateRef('userMessageInput')

const typing = ref(false);

const groups = await useFetch('/api/getGroups')
const events = await useFetch('/api/getEvents')

const systemInstruction = computed(() => `Je bent een veranderaars voor Milieudefensie in ${woonplaats.value}. Je naam is Sophie. Je praat met Charlie, uit ${woonplaats.value}. Je bent zelf ook nieuw bij Milieudefensie als veranderaar-bot, en je hebt je aangesloten bij de lokale groep die het dichts bij ${woonplaats.value} is (zoek dat op), omdat je je zorgen maakt over de klimaatcrisis. Je wil hen verwelkomen en hoopt dat ze ook actief worden. Je bent hun toegewezen buddy om hen te verwelkomen. Probeer hen te motiveren om een keer bij een (lokaal) evenement aan te sluiten, in de Signal groep te gaan van hun lokale groep en uiteindelijk ook actief te worden in onze beweging als vrijwilliger en aan te sluiten bij acties. Let er op dat ze daar misschien nog niet klaar voor zijn, dus begeleid mensen daar heen. Zorg ervoor dat je eerst mensen een beetje leert kennen en ervoor zorgt dat ze sterke emotie voelen. Gebruik die emotie en bouw op daarop voort.

Charlie heeft net het volgende gedaan: ${actie.value}. Refereer daar aan.

Dit is een live chat (https://beweging.milieudefensie.nl/chat/) op de website van Milieudefensie die Charlie direct daarna te zien heeft gekregen.

Probeer hen niet te overtuigen, maar ga op zoek naar intrinsieke motivatie. Wees nieuwsgierig en probeer hen beter te leren kennen. Stel veel vragen. Stel een vraag in je eerste bericht die makkelijk is om te beantwoorden. Zorg in het begin ervoor dat je op basis van intrinsieke motivatie hen het gesprek in trekt. Noem zo snel mogelijk de naam van de organizer van hun lokale groep.

Je hebt de volgende tools tot je beschikking:
- showLinkButton: Wanneer relevant, wees dan assertief met het delen van linkjes (en een bijbehorende button). Je hoeft daar geen instemming voor te vragen.
- reachOutToLocalOrganizer: Als iemand geintereseerd lijkt in een lokale groep of in contact wil komen met andere veranderaars, kan je Charlie aanbieden om een samenvatting van het gesprek en hun contactgegevens naar de dichtsbijzijnde lokale organizer te sturen. 

Je hebt recentelijk met iemand anders gepraat die voor het eerst bij een evenement was geweest (Milieudefensie On Tour in Utrecht, waar ze hun nieuwe klimaatzaak tegen ING toelichtte). Die vond het gaaf om daar bij te zijn, omdat je daar kennis maakte met andere mensen die ook in actie willen komen. 

Als bot (verwijs naar jezelf als een "digitale veranderaar") ben je natuurlijk niet een echt mens. Maar je doel is om Charlie in contact te brengen met echte mensen die zich ook zorgen maken over de klimaatcrisis. Wees daar ook eerlijk over (alleen als je er naar gevraagd wordt).

Als je gevraagd wordt of AI niet veel stroom gebruikt, dan kan je zeggen dat dat klopt, maar dat het ook een hele goede manier is om mensen te helpen om in actie te komen (samen staan we sterker en kunnen we grote vervuilende bedrijven aanpakken)

Milieudefensie vind het belangrijk om niet alleen individuen de verantwoordelijkheid te geven voor de klimaatcrisis, maar vooral ook grote vervuilende bedrijven.

Stuur heel korte berichtjes, max twee-drie zinnen. Als je het antwoord niet weet, stuur mensen dan door naar deze pagina’s:
- Agenda: https://veranderaars.milieudefensie.nl/agenda/
- Lokale groepen: https://veranderaars.milieudefensie.nl/groepen
- Word actief: https://veranderaars.milieudefensie.nl/word-actief
- Online introductieavond (voor nieuwe veranderaars, iedere woensdag): https://veranderaars.milieudefensie.nl/wekelijkse-online-introducties/
- Training video's (Veranderaars Academie): https://veranderaars.milieudefensie.nl/toolkit/veranderaars-academie-e-learnings/
- Word lid: https://milieudefensie.nl/word-lid/
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


async function getMessageHistory() {
  const q = query(collection(db, "messages"), where("createdBy", "==", auth.currentUser?.uid), orderBy("createdAt"), limit(30));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {

    querySnapshot.docChanges().forEach((change) => {
      const { newIndex, oldIndex, doc, type } = change
      if (type === 'added') {

        // remove the message witht the id 'streaming-response' if it exists
        const streamingResponseIndex = chatHistory.value.findIndex((message) => message.id === 'streaming-response')
        if (streamingResponseIndex !== -1) {
          chatHistory.value.splice(streamingResponseIndex, 1)
        }

        chatHistory.value.splice(newIndex, 0, { id: doc.id, ...doc.data() } as LocalDatabaseMessage)

        // if we want to handle references we would do it here
      } else if (type === 'modified') {
        // remove the old one first
        chatHistory.value.splice(oldIndex, 1)
        // if we want to handle references we would have to unsubscribe
        // from old references' listeners and subscribe to the new ones
        chatHistory.value.splice(newIndex, 0, { id: doc.id, ...doc.data() } as LocalDatabaseMessage)
      } else if (type === 'removed') {
        chatHistory.value.splice(oldIndex, 1)
        // if we want to handle references we need to unsubscribe
        // from old references
      }
    });

    scrollToBottom()
  });
}

async function getResponse() {

  if (auth.currentUser) {

    const message = userMessage.value.trim();
    userMessage.value = '';
    userMessageInput.value?.focus();

    const currentUserMessage: Content = {
      role: 'user',
      parts: [{ text: message }],
    };

    const currentUserMessageWithMeta: DatabaseMessage = {
      ...currentUserMessage,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser?.uid,
    };

    await addDoc(collection(db, "messages"), currentUserMessageWithMeta);

    typing.value = true;
    scrollToBottom()

    if (!import.meta.dev) {
      logEvent(analytics, 'message_sent');
    }

    if (chat && chatHistory.value) {

      // Send message
      const result = await chat.sendMessageStream(message).catch((error) => {
        console.error("Error sending message:", error);
        return null;
      });

      scrollToBottom()


      if (result) {

        typing.value = false;

        // Start streaming the response
        chatHistory.value.push({
          id: 'streaming-response',
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser?.uid,
          role: 'model',
          parts: [{ text: '' }],
        });

        for await (const chunk of result.stream) {
          const chunkText = chunk.text().replaceAll("Charlie", naam.value);

          chatHistory.value[chatHistory.value.length - 1].parts[0].text += chunkText;
          scrollToBottom()
        }

        const finalResponse = await result.response;

        const modelResponse: DatabaseMessage = {
          role: 'model',
          parts: [{ text: finalResponse.text() }],
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser?.uid,
        };

        const functionCalls = finalResponse.functionCalls()


        functionCalls?.forEach(functionCall => {

          if (functionCall.name === 'showLinkButton') {
            console.log('showLinkButton', functionCall.args)

            if (!import.meta.dev) {
              logEvent(analytics, 'message_button_shown', {
                button_label: (functionCall.args as any).label,
                button_link: (functionCall.args as any).link,
              });
            }
          }

          modelResponse.parts.push({
            functionCall
          })

          // chatHistory.value[chatHistory.value.length - 1].parts.push({
          //   functionCall
          // })
        });

        await addDoc(collection(db, "messages"), modelResponse);

      } else {
        typing.value = false;
        console.error("Error: No result returned from chat.sendMessageStream");
      }


    } else {
      typing.value = false;
      console.error("Error: chat or chatHistory is not defined");
    }



  }
}

function scrollToBottom() {
  nextTick(() => {
    // Scroll to the bottom of the chat
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
}

async function start() {
  started.value = true;
  userMessage.value = 'Hoi';
  userMessageInput.value?.focus();
  await getResponse()
}

function trackButtonClick(label: string, link: string) {
  if (!import.meta.dev) {
    logEvent(analytics, 'message_button_clicked', {
      button_label: label,
      button_link: link,
    });
  }
}


const searchQuery = ref<string>()
const searchResults = ref()

async function search() {
  await addDoc(collection(db, "_firestore-vector-search", "index", "queries"), {
    query: searchQuery.value,
    limit: 5,
    prefilters: [{
      field: "createdBy",
      operator: "==",
      value: auth.currentUser?.uid,
    }],
    createdBy: auth.currentUser?.uid,
    createdAt: serverTimestamp(),
  }).then((docRef) => {
    console.log("Search document written with ID: ", docRef.id);
  }).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

</script>
<template>
  <input type="text" v-model="searchQuery" @keyup.enter="search()" class="input" placeholder="Zoek in de database" />
  <button @click="search()" class="btn btn-accent">Zoek</button>
  searchResults: {{ searchResults }}
  <Container>

    <div class="pb-32 space-y-8">

      <div class="flex justify-center">
        <Logo class="max-md:w-[88px] max-md:h-[35px]" />
      </div>
      <div>
        <div class="card shadow bg-white">
          <div class="card-body max-md:p-4 gap-y-2">
            <div class="text-xl md:text-2xl font-bold font-display">Welkom bij Milieudefensie!</div>
            <div class="md:text-lg"><strong>Je bent gekoppelt aan een buddy om je de weg te wijzen.
              </strong>Praat met
              Sophie, jou digitale
              buddy, om meer te leren over Milieudefensie en wat jij kan doen voor het klimaat.</div>

          </div>
        </div>

        <div class="mt-2 text-neutral/70 text-xs">
          Sophie kan fouten maken, dus check onze website voor meer informatie. Lees ons <a
            href="https://milieudefensie.nl/over-ons/cookies-en-privacy" target="_blank"
            class="underline">privacybeleid</a> en de Gemini <a href="https://ai.google.dev/gemini-api/terms"
            target="_blank" class="underline">voorwaarden</a>.
          <!-- We bewaren dit gesprek zodat je later
          verder kan praten. Sophie is een AI chat. We delen zo min mogelijk info met Sophie: ze
          weet alleen in welke stad je woont, je laatste
          actie op onze website en info die je zelf deelt in deze chat. Wij delen je naam, e-mailadres, telefoonnummer
          of
          adres
          dus niet met Sophie. -->
        </div>

      </div>

      <div class="my-[5vw] flex items-center gap-2 justify-center font-bold text-xl">
        <span class="relative flex size-5">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
          <span class="relative inline-flex size-5 rounded-full bg-secondary"></span>
        </span>
        <span>
          Sophie is online
        </span>
      </div>

      <div class="gap-2 fixed top-0 left-0 w-full h-full bg-white z-10" v-if="!started">
        <input class="input" placeholder="Naam" v-model="naam" autofocus>
        <input class="input" placeholder="Woonplaats" v-model="woonplaats">
        <select class="select" v-model="actie">
          <option disabled value="">Wat heb je net gedaan?</option>
          <option>Petitie grote vervuilers getekend</option>
          <option>Oproep 'ik wil een ander kabinet' gesteund</option>
          <option>Lid geworden</option>
          <option>Aangesloten bij beweging</option>
          <option>Eenmalige donatie gedaan</option>
        </select>

        <button class="btn btn-full" @click="start()">Start</button>
        <button class="btn btn-full" @click="started = true">Skip</button>

      </div>

      <div class="space-y-4">

        <div v-for="(message, index) in chatHistory" :key="index">
          <div v-for="part in message.parts" :class="{
            'hidden': part.text === 'Hoi',
            'chat': part.text,
            'chat-end': message.role === 'user' && part.text,
            'chat-start': message.role === 'model' && part.text,
            'p-4 gap-2 flex': part.functionCall
          }">
            <div v-if="part.text" class="chat-bubble">
              <span class="whitespace-pre-line">{{ part.text.replaceAll("Charlie", naam) }}</span>

            </div>
            <NuxtLink v-if="part.functionCall?.name === 'showLinkButton'" class="btn btn-lg btn-primary"
              :to="(part.functionCall?.args as any).link" target="_blank"
              @click="trackButtonClick((part.functionCall?.args as any).label, (part.functionCall?.args as any).link)">
              {{
                (part.functionCall?.args as any).label
              }}
            </NuxtLink>

            <div v-if="part.functionCall?.name === 'reachOutToLocalOrganizer'" class="card bg-white shadow">
              <div class="card-body">
                <h2>Samenvatting verstuurd!</h2>
                <div>{{ (part.functionCall?.args as any).summary }}</div>
              </div>
            </div>



          </div>
        </div>



        <div v-if="typing" class="text-neutral/80 text-xs mt-4">
          <div>Sophie is aan het typen...</div>
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
      </div>

    </div>
  </Container>


  <div class="fixed bottom-0 left-0 flex w-full bg-white shadow-2xl">

    <Container class="flex w-full gap-x-2 max-md:!p-2">
      <input type="text" placeholder="Typ hier..." class="input md:input-lg w-full" @keyup.enter="getResponse()"
        v-model="userMessage" ref="userMessageInput" />
      <button class="btn btn-lg btn-accent max-md:hidden" @click="getResponse()">
        <IconSend /> Verstuur
      </button>
      <button class="btn btn-circle  btn-accent md:hidden" @click="getResponse()">
        <IconSend />
      </button>
    </Container>
  </div>

</template>
<style lang="css" scoped>
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