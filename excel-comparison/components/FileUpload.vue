<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Upload Excel Files</h2>
    
    <!-- Drag and Drop Zone -->
    <div
      class="drop-zone"
      :class="{ 'active': isDragging }"
      @drop="handleDrop"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @click="triggerFileInput"
    >
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9.9.9 0 01-.9.9H7z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11v8m0 0l3-3m-3 3l-3-3" />
        </svg>
        <p class="text-lg font-medium text-gray-700 mb-2">
          Drop your Excel files here, or click to browse
        </p>
        <p class="text-sm text-gray-500">
          Supports .xlsx and .xls formats, up to 10MB per file
        </p>
      </div>
      
      <input
        ref="fileInput"
        type="file"
        multiple
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        class="hidden"
        @change="handleFileSelect"
      />
    </div>

    <!-- File Preview -->
    <FilePreview v-if="files.length > 0" class="mt-6" />

    <!-- Action Buttons -->
    <div class="flex gap-4 mt-6">
      <button
        @click="uploadFiles"
        :disabled="files.length !== 2 || isUploading"
        class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isUploading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Uploading...
        </span>
        <span v-else>Compare Files</span>
      </button>
      
      <button
        @click="clearFiles"
        :disabled="files.length === 0 || isUploading"
        class="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear Files
      </button>
    </div>

    <!-- Upload Progress -->
    <div v-if="isUploading" class="mt-4">
      <div class="flex justify-between text-sm text-gray-600 mb-2">
        <span>Uploading files...</span>
        <span>{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-primary-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '~/stores/files'
import { useFileUpload } from '~/composables/useFileUpload'

const store = useFilesStore()
const { uploadFiles: uploadFilesComposable, handleFileDrop, handleFileInput } = useFileUpload()
const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)

const files = computed(() => store.files)
const isUploading = computed(() => store.isUploading)
const uploadProgress = computed(() => store.uploadProgress)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  handleFileInput(event)
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  handleFileDrop(event)
}

const uploadFiles = async () => {
  try {
    await uploadFilesComposable()
  } catch (error) {
    console.error('Upload failed:', error)
    // You could add a toast notification here
    alert(error instanceof Error ? error.message : 'Upload failed')
  }
}

const clearFiles = () => {
  store.clearFiles()
}
</script>