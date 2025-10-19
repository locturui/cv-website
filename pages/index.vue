<template>
  <section class="relative hero min-h-screen overflow-hidden" data-aos="fade-up">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--p)/0.15),transparent_50%)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--s)/0.12),transparent_50%)]"></div>
    
    <div class="hero-content flex-col text-center relative z-10 max-w-5xl px-4 pt-24">
      <div class="space-y-8">
        <div class="inline-block">
          <div class="text-sm font-semibold tracking-widest text-primary mb-4 uppercase">
            {{ $t('hero.hi') }}
          </div>
          <h1 class="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <span class="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              {{ $t('nav.name') }}
            </span>
          </h1>
          <div class="flex gap-2 justify-center mt-6">
            <div class="h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
          </div>
        </div>
        
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-80 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          {{ $t('hero.bio') }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4" data-aos="fade-up" data-aos-delay="200">
          <NuxtLink 
            :to="localePath('/projects')" 
            class="custom-btn custom-btn-primary group text-lg px-8 py-4">
            <Sparkles class="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
            {{ $t('projects.btn') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float-delayed"></div>
  </section>

  <section class="relative py-20 bg-base-200/30" data-aos="fade-up" data-aos-delay="150">
    <div class="max-w-5xl mx-auto px-4">
      <div class="grid gap-6 sm:grid-cols-3">
        <div class="stat bg-base-100 rounded-2xl border border-base-300 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl p-8 group">
          <div class="stat-title text-xs font-bold tracking-wider uppercase opacity-60 mb-2">{{ $t('stats.years') }}</div>
          <div class="stat-value text-primary text-6xl font-black group-hover:scale-105 transition-transform">4+</div>
          <div class="h-1 w-12 bg-primary/20 rounded-full mt-3"></div>
        </div>
        <div class="stat bg-base-100 rounded-2xl border border-base-300 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl p-8 group">
          <div class="stat-title text-xs font-bold tracking-wider uppercase opacity-60 mb-2">{{ $t('stats.bugs') }}</div>
          <div class="stat-value text-secondary text-6xl font-black group-hover:scale-105 transition-transform">1000+</div>
          <div class="h-1 w-12 bg-secondary/20 rounded-full mt-3"></div>
        </div>
        <div class="stat bg-base-100 rounded-2xl border border-base-300 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl p-8 group">
          <div class="stat-title text-xs font-bold tracking-wider uppercase opacity-60 mb-2">{{ $t('stats.coffee') }}</div>
          <div class="stat-value text-accent text-6xl font-black group-hover:scale-105 transition-transform">∞</div>
          <div class="h-1 w-12 bg-accent/20 rounded-full mt-3"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Sparkles, Download } from 'lucide-vue-next'
const localePath = useLocalePath()

definePageMeta({
  layout: 'home'
})
</script>
