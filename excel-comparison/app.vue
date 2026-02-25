<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: 'Excel File Comparison Tool',
  meta: [
    { name: 'description', content: 'Compare two Excel files using n8n webhook processing' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>