<!-- 
FORM
Using this component, you can add a form to your page. You can either use a native form, embed a Hubspot form, or add a custom embed code.

-->
<script lang="ts" setup>
export interface NativeForm {
  id: string;
}

export interface HubspotForm {
  id: string;
}

export interface FormProps {
  form?: NativeForm; // Native form
  label?: string; // Label for the form
  hubspot?: HubspotForm; // Embed Hubspot form
  embed?: string; // Custom embed code
}

const props = defineProps<FormProps>()
</script>
<template>
  <div class="space-y-4">
    <input class="input input-lg xl:input-xl w-full placeholder:text-neutral hover:border-neutral bg-white md:!text-lg"
      type="text" placeholder="E-mail" />

    <div><label class="flex gap-2 items-center text-lg/6 text-balance xl:text-xl group cursor-pointer"><input
          type="checkbox" class="checkbox checkbox-lg xl:checkbox-xl group-hover:border-neutral" /> Ik wil
        helpen om deze mars groot te maken</label></div>
    <div><label class="flex gap-2 items-center text-lg/6 text-balance xl:text-xl group cursor-pointer"><input
          type="checkbox" class="checkbox checkbox-lg xl:checkbox-xl group-hover:border-neutral" /> Houd mij
        op de
        hoogte van de
        beweging</label></div>
    <button class="btn btn-lg xl:btn-xl w-full btn-secondary ">{{ label }}</button>
  </div>

</template>