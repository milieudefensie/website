<template>
  <div class="form min-h-[143.39px]" ref="form1">
    <div id="form-1"></div>

  </div>
  <dialog ref="dialog" id="follow-up-questions" class="modal text-black">
    <div class="modal-box size-full max-w-none max-h-none rounded-none">
      <button class="btn btn-circle btn-ghost absolute right-2 top-2 text-neutral-500/75"
        @click="closeDialog()">✕</button>

      <div class="max-w-[1000px] mx-auto p-6 my-[8vh] gap-6 grid" ref="form2">
        <h1 class="text-6xl font-display">Bijna klaar...</h1>
        <p>Nog een paar korte vragen.</p>
        <div id="form-2"></div>
        <div class="text-xs text-neutral/50 mt-2 italic">
          We houden je op de hoogte over onze beweging en acties bij jou in de buurt via je ingevulde e-mailadres. Als
          je je nummer deelt kunnen we je bellen of een WhatsApp-berichtje sturen om je op weg te helpen. Deze
          website wordt beschermd door Google reCAPTCHA (zie privacybeleid en voorwaarden). Lees onze
          privacybepaling voor alle details.
        </div>
      </div>

    </div>
  </dialog>
</template>

<script setup>

const form1 = ref(null);
const form2 = ref(null);

const observeFormChanges = () => {
  if (!form1.value) return;
  if (!form2.value) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Remove .input class from the new elements
          if (node.classList.contains("input")) {
            node.classList.remove("input");
          }
          // Also check inside the node for any children with .input class
          node.querySelectorAll(".input").forEach((el) => el.classList.remove("input"));
        }
      });
    });
  });

  // Start observing the container for dynamically added elements
  observer.observe(form1.value, { childList: true, subtree: true });
  observer.observe(form2.value, { childList: true, subtree: true });
};


useHead({
  script: [{ src: "https://js.hsforms.net/forms/v2.js", defer: true }],
});

onMounted(async () => {
  // const script = document.createElement("script");
  // script.src = "https://js.hsforms.net/forms/v2.js";
  // script.type = "text/javascript";
  // script.onload = () => {
  if (window.hbspt) {
    window.hbspt.forms.create({
      region: "eu1",
      portalId: "139720471",
      formId: "32d620c0-cc4e-4002-8912-bea2d756286e",
      target: '#form-1',
      onBeforeFormSubmit: function ($form) {
        console.log("Form is about to be submitted!", $form);
        // Add your custom logic here
      },
      onFormSubmitted($form, data) {
        console.log("Form has been submitted!", data);
        openDialog()

        document.querySelectorAll(".hs-input[name='email']").forEach(input => {
          input.value = data.submissionValues.email;
        });

        const secondInput = document.querySelector('#follow-up-questions div:nth-of-type(2) input');
        console.log(secondInput)
        if (secondInput) {
          secondInput.focus();
        }

      }

    });

    window.hbspt.forms.create({
      region: "eu1",
      portalId: "139720471",
      formId: "3359ea53-4b1e-4a7c-90a0-764b03f45438",
      target: '#form-2',
      onBeforeFormSubmit: function ($form) {
        console.log("Form is about to be submitted!", $form);
        // Add your custom logic here
      },
      onFormSubmitted($form, data) {
        console.log("Form has been submitted!", data);
        closeDialog()
      }

    });

    observeFormChanges();
  }
  // };
  // document.body.appendChild(script);
});


const dialog = ref(null);

function openDialog() {
  if (dialog.value) {
    dialog.value.showModal();
  }
};

function closeDialog() {
  if (dialog.value) {
    dialog.value.close();
  }
};
</script>



<style>
.hsfc-Step__Content {
  padding: 0
}
</style>
