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
  <div class="space-y-2">
    <input class="input w-full lg:input-lg placeholder:text-neutral border-neutral bg-white" type="text"
      placeholder="E-mail" />
    <button class="btn w-full btn-secondary lg:btn-lg">{{ label }}</button>
  </div>

</template>