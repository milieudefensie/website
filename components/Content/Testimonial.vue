<template>
  <div class="chat chat-start" v-for="(testimonial, index) in props.testimonials" :key="index">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
    <div class="chat-header">
      {{ testimonial.author }}
    </div>
    <div class="chat-bubble text-xl font-bold">{{ testimonial.content }}</div>
  </div>

</template>
<script lang="ts" setup>
export type Testimonal = {
  author: string;
  content: string;
}

export type TestimonialProps = {
  testimonials: Testimonal[]
}

const props = defineProps<TestimonialProps>()
</script>