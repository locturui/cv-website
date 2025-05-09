<script setup lang="ts">
const { locale, setLocale } = useI18n()

function toggle () {
  setLocale(locale.value === 'en' ? 'ru' : 'en')
}
</script>

<template>
  <button @click="toggle"
          class="swap swap-rotate btn btn-ghost btn-circle">
    {{ locale === 'en' ? 'RU' : 'EN' }}
  </button>
</template>
