<template>
  <section class="py-24 text-center space-y-8" data-aos="zoom-in">
    <h2 class="text-4xl font-bold">{{ $t('cta.title') }}</h2>
    <p class="max-w-lg mx-auto opacity-80">{{ $t('cta.lead') }}<br>{{ $t('cta.add') }}</p>
  
    <div class="flex flex-wrap justify-center gap-4">
      <a href="mailto:leonovstepan.jobs@outlook.com" class="btn btn-primary gap-2">
        <Mail class="w-5 h-5" /> {{ $t('cta.email') }}
      </a>
      <a href="https://t.me/peatubaeg" target="_blank" class="btn btn-outline gap-2">
        <Send class="w-5 h-5" /> {{ $t('cta.telegram') }}
      </a>
      <a href="https://github.com/locturui" target="_blank" class="btn btn-outline gap-2">
        <Github class="w-5 h-5" /> {{ $t('cta.github') }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail, Send, Github } from 'lucide-vue-next'
</script>
