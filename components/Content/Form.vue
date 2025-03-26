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
  hubspot?: HubspotForm; // Embed Hubspot form
  embed?: string; // Custom embed code
}

const props = defineProps<FormProps>()
</script>
<template>
  Form
  <button class="btn">Submit</button>
</template>