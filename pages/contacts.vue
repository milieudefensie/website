<script setup lang="ts">
import IconCall from '~icons/mdi/call';
import IconChat from '~icons/mdi/chat';
import IconInfo from '~icons/mdi/info';
import IconBook from '~icons/mdi/book-open-variant';
import IconOpenInNew from '~icons/mdi/open-in-new';
import IconPhoneCancel from '~icons/mdi/phone-cancel';
import IconWarning from '~icons/mdi/warning';
import IconLogout from '~icons/mdi/logout';
import type { Contact } from '~/components/ContactList.vue';

definePageMeta({
  layout: 'fullscreen',
});

const people = ref<Contact[]>([
  {
    id: 1,
    name: 'Pietje',
    notes: 'Wil wel een klimaatgesprek organiseren',
    phone: '+31612345678',
    allowedToCall: true, // This person is allowed to be called
  },
  {
    id: 2,
    name: 'Sophie',
    phone: '+31612345678',
    allowedToCall: true, // This person is not allowed to be called
  },
  {
    id: 3,
    name: 'Greta',
    phone: '+31612345678',
    allowedToCall: true, // This person is allowed to be called
  },
  {
    id: 4,
    name: 'Edward',
    phone: '+31612345678',
    allowedToCall: false, // This person is not allowed to be called
  },
  {
    id: 5,
    name: 'Klaas',
    phone: '+31612345678',
    allowedToCall: false,
  },
]);

const chatModal = ref<HTMLDialogElement | null>(null);
const phoneModal = ref<HTMLDialogElement | null>(null);
const notesModal = ref<HTMLDialogElement | null>(null);
const privacyModal = ref<HTMLDialogElement | null>(null);

const currentPerson = ref<Contact>({
  id: 0,
  name: '',
  notes: '',
  phone: '',
  allowedToCall: false, // Default values
});

function openChatModal(person: Contact) {
  if (chatModal.value) {
    currentPerson.value = { ...person };;
    chatModal.value.showModal();
  }
}

function openPhoneModal(person: Contact) {
  if (phoneModal.value) {
    currentPerson.value = { ...person };
    phoneModal.value.showModal();
  }
}

function openNotesModal(person: Contact) {
  if (notesModal.value && chatModal.value) {
    currentPerson.value = { ...person };;
    chatModal.value.close();
    notesModal.value.showModal();
  }
}

onMounted(() => {
  // Automatically open the privacy modal when the component is mounted
  if (privacyModal.value) {
    privacyModal.value.showModal();
  }
});
</script>
<template>
  <div class="flex justify-between p-4 bg-white shadow fixed top-0 left-0 w-full z-10">
    <h1 class="text-5xl font-display">Bellijst</h1>
    <div class="flex items-center gap-4">
      <div class="font-bold text-end text-balance text-xs max-sm:hidden">Klaar met bellen? Vergeet niet uit te loggen!
      </div>
      <button class="btn btn-primary">
        <IconLogout /> Log uit
      </button>
    </div>
  </div>
  <Container class="space-y-12 mt-32 mb-16">
    <div class="space-y-4">

      <h1 class="text-3xl">Veranderaars in <strong>Utrecht</strong></h1>
      <p class="text-lg">Deze mensen hebben zich recentelijk aangemeld. Geef ze een warm welkom door ze zo snel mogelijk
        na aanmelding
        te
        bellen (doe dit liefst binnen 24 uur, uiterlijk binnen twee weken). Stuur daarna een follow-up berichtje via
        Signal of WhatsApp.</p>

      <div role="alert" class="bg-white rounded-lg shadow p-4 flex gap-2 max-md:flex-wrap items-center">
        <div>
          <IconInfo class="text-xl" />
        </div>
        <div class="flex-grow">
          We houden automatisch bij wie je hebt gebeld. Je kan zelf notities toevoegen. Deze zijn in te zien door
          medewerkers van Milieudefensie en andere organizers van jouw lokale groep.
        </div>
        <button class=" btn btn-primary" @click="privacyModal?.showModal()">
          <IconBook />
          Handleiding bellen
        </button>

      </div>
    </div>



    <div>
      <h2 class="text-3xl font-bold font-display mb-4">
        Nog niet gebeld ☎️
      </h2>
      <ContactList :contacts="people" @edit="openNotesModal" @call="openPhoneModal" @message="openChatModal" />
    </div>

    <div>
      <h2 class="text-3xl font-bold font-display mb-4">
        Terugbellen 📆
      </h2>
      <ContactList :contacts="people" @edit="openNotesModal" @call="openPhoneModal" @message="openChatModal" />
    </div>

    <div>
      <h2 class="text-3xl font-bold font-display mb-4">
        Succesvol gebeld ✅
      </h2>
      <ContactList :contacts="people" @edit="openNotesModal" @call="openPhoneModal" @message="openChatModal" />
    </div>

    <!-- Kies chat app -->
    <dialog class="modal" ref="chatModal">
      <div class="modal-box space-y-6">
        <h3 class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-xl font-bold ">
            {{ currentPerson?.name }}
          </span>
          <span class="flex items-center gap-2">
            <IconChat /> {{ currentPerson?.phone }}
          </span>
        </h3>
        <p>Welke chat app wil je gebruiken om deze veranderaar een berichtje te sturen?</p>
        <div class="modal-action">
          <form method="dialog" class="flex gap-2 flex-wrap">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn sm:btn-sm">Annuleer</button>
            <NuxtLink class="btn btn-accent sm:btn-sm" @click="openNotesModal(currentPerson)"
              :to="`https://signal.me/#p/${currentPerson?.phone}`" target="_blank">
              <IconOpenInNew class="max-sm:hidden" /> Signal
            </NuxtLink>
            <NuxtLink class="btn btn-accent sm:btn-sm" @click="openNotesModal(currentPerson)"
              :to="`https://wa.me/${currentPerson?.phone}`" target="_blank">
              <IconOpenInNew class="max-sm:hidden" /> WhatsApp
            </NuxtLink>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Toon telefoonnummer -->
    <dialog class="modal" ref="phoneModal">
      <div class="modal-box space-y-6">
        <h3 class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-xl font-bold ">
            {{ currentPerson?.name }}
          </span>
          <span class="flex items-center gap-2">
            <IconCall /> {{ currentPerson?.phone }}
          </span>
        </h3>
        <ul class="space-y-2">
          <li>
            <label class="flex items-center gap-2">
              <input type="radio" name="radio-1" class="radio" />
              Nam niet op
            </label>

          </li>
          <li>
            <label class="flex items-center gap-2"><input type="radio" name="radio-1" class="radio" />
              Later terugbellen
            </label>
          </li>
          <li>
            <label class="flex items-center gap-2"><input type="radio" name="radio-1" class="radio" />
              Niet geinteresseerd
            </label>
          </li>
          <li>
            <label class="flex items-center gap-2"><input type="radio" name="radio-1" class="radio" />
              Telefoonnummer werkt niet
            </label>
          </li>
          <li>
            <label class="flex items-center gap-2"><input type="radio" name="radio-1" class="radio" />
              Succesvol gesprek
            </label>
          </li>
        </ul>
        <input type="text" placeholder="Notities" class="input w-full" v-model="currentPerson.notes" />

        <div class="modal-action">
          <form method="dialog" class="flex gap-2">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Annuleer</button>
            <button class="btn btn-accent">Bewaar notities</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Bewaar notities -->
    <dialog class="modal" ref="notesModal">
      <div class="modal-box space-y-6">
        <h3 class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-xl font-bold ">
            {{ currentPerson?.name }}
          </span>
        </h3>

        <!-- <input type="text" placeholder="Notities" class="input w-full" v-model="currentPerson.notes" /> -->
        <SimpleTextEditor placeholder="Notities..." />

        <div class="text-xs text-neutral/70 border-1 border-neutral/10 p-4 rounded">

          <div class="mb-2">Meer opties:</div>
          <div class="flex flex-wrap gap-2">

            <button class="btn btn-xs btn-soft btn-accent">
              <IconPhoneCancel /> Telefoonnummer werkt niet
            </button>

            <button class="btn btn-xs btn-soft btn-accent">
              <IconWarning /> Rapporteer persoon
            </button>
          </div>

        </div>
        <div class="modal-action">
          <form method="dialog" class="flex gap-2 flex-wrap">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Annuleer</button>
            <button class="btn btn-accent">Bewaar notities</button>
          </form>
        </div>
      </div>
    </dialog>


    <!-- Privacy -->
    <dialog class="modal" ref="privacyModal">
      <div class="modal-box space-y-6 prose max-sm:w-full max-sm:rounded-none">
        <h3 class="text-xl font-bold">
          Handleiding bellen
        </h3>
        <h4>Privacy van veranderaars</h4>
        <p>Om de privacy van veranderaars te beschermen doen we het volgende:</p>
        <ul>
          <li>Je moet een vrijwilligerscontract tekenen om toegang te krijgen tot contactgegevens van veranderaars.
          </li>
          <li>We houden bij wie je belt en berichtjes stuurt.</li>
          <li>Telefoonnummers van veranderaars blijven maximaal twee weken na aanmelding zichtbaar.</li>
          <li>Je mag maximaal 20 veranderaars bellen per week, en maximaal 1 per minuut.</li>
          <li>Je krijgt alleen veranderaars te zien die in de buurt van jou lokale groep wonen.</li>
          <li>Je kan zelf notities toevoegen. Deze zijn in te zien door medewerkers van Milieudefensie en andere
            organizers van jou lokale groep (niet door de veranderaar).</li>
        </ul>
        <h4>Tips voor het bellen</h4>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, ex obcaecati accusamus nesciunt suscipit,
          blanditiis corrupti totam error excepturi, laborum ullam libero aspernatur possimus odio nostrum ipsum eius.
          Debitis, porro.</p>
        <h4>Tips voor berichtjes sturen</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ipsum amet quae eum ad rerum impedit voluptate
          eius esse iste nemo reprehenderit vitae accusantium, magnam facere molestias expedita pariatur quasi?</p>
        <div class="modal-action">
          <form method="dialog" class="flex gap-2">
            <button class="btn btn-primary max-sm:btn-sm">Ik heb de handleiding gelezen & ga akkoord</button>
          </form>
        </div>
      </div>
    </dialog>

  </Container>

</template>