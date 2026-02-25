<template>
  <div class="space-y-4">
    <!-- Added Items -->
    <div v-if="addedItems.length > 0" class="border border-green-200 rounded-lg overflow-hidden">
      <button
        @click="toggleSection('added')"
        class="w-full px-4 py-3 bg-green-50 text-green-800 font-medium flex items-center justify-between hover:bg-green-100 transition-colors"
      >
        <span class="flex items-center">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Added Items ({{ addedItems.length }})
        </span>
        <svg
          class="h-5 w-5 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.added }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div v-show="expandedSections.added" class="bg-white p-4">
        <div class="space-y-2 max-h-96 overflow-y-auto">
          <div
            v-for="(item, index) in addedItems"
            :key="`added-${index}`"
            class="p-3 bg-green-50 border border-green-200 rounded-lg"
          >
            <pre class="text-sm text-green-800 overflow-x-auto">{{ formatJson(item) }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Removed Items -->
    <div v-if="removedItems.length > 0" class="border border-red-200 rounded-lg overflow-hidden">
      <button
        @click="toggleSection('removed')"
        class="w-full px-4 py-3 bg-red-50 text-red-800 font-medium flex items-center justify-between hover:bg-red-100 transition-colors"
      >
        <span class="flex items-center">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
          Removed Items ({{ removedItems.length }})
        </span>
        <svg
          class="h-5 w-5 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.removed }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div v-show="expandedSections.removed" class="bg-white p-4">
        <div class="space-y-2 max-h-96 overflow-y-auto">
          <div
            v-for="(item, index) in removedItems"
            :key="`removed-${index}`"
            class="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <pre class="text-sm text-red-800 overflow-x-auto">{{ formatJson(item) }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Changed Items -->
    <div v-if="changedItems.length > 0" class="border border-amber-200 rounded-lg overflow-hidden">
      <button
        @click="toggleSection('changed')"
        class="w-full px-4 py-3 bg-amber-50 text-amber-800 font-medium flex items-center justify-between hover:bg-amber-100 transition-colors"
      >
        <span class="flex items-center">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          Changed Items ({{ changedItems.length }})
        </span>
        <svg
          class="h-5 w-5 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.changed }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div v-show="expandedSections.changed" class="bg-white p-4">
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div
            v-for="(item, index) in changedItems"
            :key="`changed-${index}`"
            class="p-3 bg-amber-50 border border-amber-200 rounded-lg"
          >
            <div v-if="item.key" class="mb-2">
              <span class="text-sm font-medium text-amber-800">Key: {{ item.key }}</span>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-medium text-gray-600 mb-1">Before:</p>
                <pre class="text-sm text-red-700 bg-red-50 p-2 rounded border border-red-200 overflow-x-auto">{{ formatJson(item.before) }}</pre>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-600 mb-1">After:</p>
                <pre class="text-sm text-green-700 bg-green-50 p-2 rounded border border-green-200 overflow-x-auto">{{ formatJson(item.after) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Changes Message -->
    <div v-if="noChanges" class="text-center py-12">
      <div class="bg-gray-50 rounded-lg p-8">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No Changes Found</h3>
        <p class="text-gray-600">The files appear to be identical or contain no comparable data.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '~/stores/files'

const store = useFilesStore()
const comparisonResult = computed(() => store.comparisonResult)

const expandedSections = ref({
  added: true,
  removed: true,
  changed: true
})

const addedItems = computed(() => {
  return comparisonResult.value?.output?.added || []
})

const removedItems = computed(() => {
  return comparisonResult.value?.output?.removed || []
})

const changedItems = computed(() => {
  return comparisonResult.value?.output?.changed || []
})

const noChanges = computed(() => {
  return addedItems.value.length === 0 && 
         removedItems.value.length === 0 && 
         changedItems.value.length === 0
})

const toggleSection = (section: 'added' | 'removed' | 'changed') => {
  expandedSections.value[section] = !expandedSections.value[section]
}

const formatJson = (obj: any): string => {
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return String(obj)
  }
}

// Methods for parent component
const expandAll = () => {
  expandedSections.value = {
    added: true,
    removed: true,
    changed: true
  }
}

const collapseAll = () => {
  expandedSections.value = {
    added: false,
    removed: false,
    changed: false
  }
}

// Expose methods to parent
defineExpose({
  expandAll,
  collapseAll
})
</script>