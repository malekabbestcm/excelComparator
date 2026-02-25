<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center">
    <div class="max-w-md w-full">
      <div class="card text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p class="text-gray-600 mb-6">
          {{ errorMessage }}
        </p>
        
        <div class="space-y-3">
          <button
            @click="goHome"
            class="btn-primary w-full"
          >
            Go back to upload
          </button>
          
          <button
            @click="retry"
            class="btn-secondary w-full"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const errorMessage = computed(() => {
  return route.query.message || 'An unexpected error occurred while processing your files.'
})

const goHome = () => {
  router.push('/')
}

const retry = () => {
  router.back()
}
</script>