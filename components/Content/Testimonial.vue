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
<template>
  <div class="space-y-6">
    <div class="chat chat-start" v-for="(testimonial, index) in props.testimonials" :key="index">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src="https://picsum.photos/60" />
        </div>
      </div>
      <div class="chat-header">
        {{ testimonial.author }}
      </div>
      <div class="chat-bubble max-w-none text-lg md:text-xl p-4 bg-accent/10">{{ testimonial.content }}</div>
    </div>
  </div>

</template>