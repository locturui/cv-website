<template>
  <section class="relative min-h-screen flex items-center justify-center pt-24 pb-16">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--p)/0.15),transparent_70%)]"></div>
    
    <div class="relative z-10 max-w-3xl mx-auto px-4" data-aos="zoom-in">
      <div class="card bg-base-100/50 backdrop-blur-md shadow-2xl border border-base-300 p-8 md:p-12">
        <h2 class="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-center mb-4">
          {{ $t('cta.title') }}
        </h2>
        <div class="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
        
        <p class="text-xl text-center opacity-80 mb-3 leading-relaxed">{{ $t('cta.lead') }}</p>
        <p class="text-lg text-center opacity-70 mb-12">{{ $t('cta.add') }}</p>
      
        <div class="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <a 
            href="mailto:leonovstepan.jobs@outlook.com" 
            class="custom-btn custom-btn-primary text-lg px-8 py-4 group">
            <Mail class="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
            {{ $t('cta.email') }}
          </a>
          <a 
            href="https://t.me/peatubaeg" 
            target="_blank" 
            class="custom-btn custom-btn-secondary text-lg px-8 py-4 group">
            <Send class="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            {{ $t('cta.telegram') }}
          </a>
          <a 
            href="https://github.com/locturui" 
            target="_blank" 
            class="custom-btn custom-btn-secondary text-lg px-8 py-4 group">
            <Github class="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
            {{ $t('cta.github') }}
          </a>
        </div>
      </div>
    </div>

    <div class="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed"></div>
  </section>
</template>

<script setup lang="ts">
import { Mail, Send, Github } from 'lucide-vue-next'

definePageMeta({
  layout: 'home'
})
</script>
