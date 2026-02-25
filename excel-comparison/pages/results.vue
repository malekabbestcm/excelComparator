<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h1 class="text-2xl font-bold text-gray-900">Excel Compare</h1>
              <p class="text-sm text-gray-600">Professional Excel file comparison tool</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="btn-secondary"
            >
              <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Upload New Files
            </button>
            
            <button
              @click="downloadResults"
              class="btn-primary"
            >
              <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Results
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Comparison Results</h2>
        <p class="text-lg text-gray-600">
          Detailed analysis of differences between your Excel files
        </p>
      </div>

      <!-- Summary Cards -->
      <SummaryCards class="mb-8" />

      <!-- Results Content -->
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Diff Viewer -->
        <div class="lg:col-span-2">
          <div class="card">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-gray-900">Detailed Changes</h3>
              <div class="flex space-x-2">
                <button
                  @click="expandAll"
                  class="text-sm text-primary-600 hover:text-primary-700"
                >
                  Expand All
                </button>
                <button
                  @click="collapseAll"
                  class="text-sm text-primary-600 hover:text-primary-700"
                >
                  Collapse All
                </button>
              </div>
            </div>
            <DiffViewer />
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- File Info -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Files Compared</h3>
            <div class="space-y-3">
              <div
                v-for="file in files"
                :key="file.id"
                class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <svg class="h-6 w-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ file.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ formatFileSize(file.size) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Processing Info -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Processing Details</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Status:</span>
                <span class="text-green-600 font-medium">Completed</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Method:</span>
                <span class="text-gray-900">n8n Webhook</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Format:</span>
                <span class="text-gray-900">JSON Diff</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '~/stores/files'
import { formatFileSize } from '~/utils/fileValidation'

const store = useFilesStore()
const files = computed(() => store.files)
const comparisonResult = computed(() => store.comparisonResult)

// Redirect if no comparison result
if (!comparisonResult.value) {
  await navigateTo('/')
}

const goBack = () => {
  store.clearFiles()
  navigateTo('/')
}

const downloadResults = () => {
  if (!comparisonResult.value) return
  
  const dataStr = JSON.stringify(comparisonResult.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `excel-comparison-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const expandAll = () => {
  // This would be implemented in the DiffViewer component
  console.log('Expand all')
}

const collapseAll = () => {
  // This would be implemented in the DiffViewer component
  console.log('Collapse all')
}
</script>