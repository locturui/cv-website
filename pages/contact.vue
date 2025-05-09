<template>
  <section class="py-24 text-center space-y-8" data-aos="zoom-in">
    <h2 class="text-4xl font-bold">Let’s Work Together</h2>

    <p class="max-w-lg mx-auto opacity-80">
      Got an idea or position that could use my skills? <br />
      Drop me a message — always happy to chat!
    </p>

    <div class="flex flex-wrap justify-center gap-4">
      <a href="mailto:leonovstepan.jobs@outlook.com" class="btn btn-primary gap-2">
        <Mail class="w-5 h-5" /> Email
      </a>
      <a href="https://t.me/locturui" target="_blank" class="btn btn-outline gap-2">
        <Send class="w-5 h-5" /> Telegram
      </a>
      <a href="https://github.com/locturui" target="_blank" class="btn btn-outline gap-2">
        <Github class="w-5 h-5" /> GitHub
      </a>
    </div>
  </section>
</template>

<script setup>
import { Mail, Send, Github } from 'lucide-vue-next'
</script>
