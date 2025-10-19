<script setup lang="ts">
const { locale, setLocale } = useI18n()

function toggle () {
  setLocale(locale.value === 'en' ? 'ru' : 'en')
}
</script>

<template>
  <button @click="toggle"
          class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-base-200/50 transition-all group font-semibold text-sm">
    {{ locale === 'en' ? 'RU' : 'EN' }}
  </button>
</template>
