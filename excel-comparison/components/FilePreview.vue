<template>
  <div class="space-y-3">
    <h3 class="text-lg font-semibold text-gray-900">Selected Files</h3>
    
    <div class="space-y-2">
      <div
        v-for="file in files"
        :key="file.id"
        class="file-item"
      >
        <div class="flex items-center space-x-3">
          <!-- File Icon -->
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <!-- File Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ file.name }}
            </p>
            <p class="text-sm text-gray-500">
              {{ formatFileSize(file.size) }}
            </p>
          </div>
          
          <!-- Remove Button -->
          <button
            @click="removeFile(file.id)"
            class="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove file"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Validation Status -->
        <div v-if="getFileValidation(file.file).error" class="mt-2">
          <p class="text-sm text-red-600">
            {{ getFileValidation(file.file).error }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- File Count Indicator -->
    <div class="text-sm text-gray-600">
      {{ files.length }} of 2 files selected
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '~/stores/files'
import { formatFileSize, validateFile, ValidationResult } from '~/utils/fileValidation'

const store = useFilesStore()
const files = computed(() => store.files)

const removeFile = (id: string) => {
  store.removeFile(id)
}

const getFileValidation = (file: File): ValidationResult => {
  return validateFile(file)
}
</script>