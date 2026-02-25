<template>
  <div class="grid md:grid-cols-3 gap-6">
    <!-- Added Items Card -->
    <div class="card border-l-4 border-green-500">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Added Items</p>
          <p class="text-3xl font-bold text-green-600">
            {{ addedCount }}
          </p>
        </div>
        <div class="bg-green-100 rounded-full p-3">
          <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm text-gray-600">
          New items found in the second file
        </p>
      </div>
    </div>

    <!-- Removed Items Card -->
    <div class="card border-l-4 border-red-500">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Removed Items</p>
          <p class="text-3xl font-bold text-red-600">
            {{ removedCount }}
          </p>
        </div>
        <div class="bg-red-100 rounded-full p-3">
          <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm text-gray-600">
          Items removed from the first file
        </p>
      </div>
    </div>

    <!-- Changed Items Card -->
    <div class="card border-l-4 border-amber-500">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Changed Items</p>
          <p class="text-3xl font-bold text-amber-600">
            {{ changedCount }}
          </p>
        </div>
        <div class="bg-amber-100 rounded-full p-3">
          <svg class="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm text-gray-600">
          Items modified between files
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '~/stores/files'

const store = useFilesStore()
const comparisonResult = computed(() => store.comparisonResult)
console.log("testttt",comparisonResult.value?.output);

const addedCount = computed(() => {
  return comparisonResult.value?.output?.added?.length || 0
})

const removedCount = computed(() => {
  return comparisonResult.value?.output?.removed?.length || 0
})

const changedCount = computed(() => {
  return comparisonResult.value?.output?.changed?.length || 0
})
</script>