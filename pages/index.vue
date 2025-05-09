<template>
  <section class="hero min-h-[70vh] bg-base-100/40" data-aos="fade-up">
    <div class="hero-content flex-col text-center">
      <h1 class="text-5xl font-extrabold leading-tight max-w-2xl">
        {{ $t('hero.hi') }} <span class="text-primary">{{ $t('nav.name') }}</span>
      </h1>
      <p class="mt-6 text-lg max-w-xl opacity-80">
        {{ $t('hero.bio') }}
      </p>

      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink :to="localePath('/projects')" class="btn btn-primary gap-2">
          <Sparkles class="w-5 h-5" /> {{ $t('projects.btn') }}
        </NuxtLink>
      </div>
    </div>
  </section>
  <section class="py-12 bg-base-200" data-aos="fade-up" data-aos-delay="150">
    <div class="max-w-4xl mx-auto grid gap-6 sm:grid-cols-3 text-center">
      <div class="stat">
        <div class="stat-title opacity-70">{{ $t('stats.years') }}</div>
        <div class="stat-value text-primary">4+</div>
      </div>
      <div class="stat">
        <div class="stat-title opacity-70">{{ $t('stats.bugs') }}</div>
        <div class="stat-value text-primary">1000+</div>
      </div>
      <div class="stat">
        <div class="stat-title opacity-70">{{ $t('stats.coffee') }}</div>
        <div class="stat-value text-primary">∞</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Sparkles, Download } from 'lucide-vue-next'
</script>
