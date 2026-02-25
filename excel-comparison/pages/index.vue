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
            <button class="text-gray-600 hover:text-gray-900">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Compare Excel Files in Seconds
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload two Excel files and get a detailed comparison showing added, removed, and changed data with our advanced n8n-powered processing.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="text-center">
          <div class="bg-primary-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9.9.9 0 01-.9.9H7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Drag & Drop</h3>
          <p class="text-gray-600">Simply drag and drop your Excel files or click to browse</p>
        </div>
        
        <div class="text-center">
          <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
          <p class="text-gray-600">Get detailed comparison results in seconds with n8n processing</p>
        </div>
        
        <div class="text-center">
          <div class="bg-amber-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg class="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Detailed Analysis</h3>
          <p class="text-gray-600">See exactly what changed, was added, or removed between files</p>
        </div>
      </div>

      <!-- Upload Component -->
      <FileUpload />

      <!-- Trust Indicators -->
      <div class="text-center mt-12">
        <p class="text-sm mb-4 flex items-center justify-center gap-2">
          <span class="text-gray-600">Crafted by</span>
          <span class="text-gray-900 font-medium">Malek abbes</span>
          <svg class="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1 21.35l-1.1-1.02C5.14 15.36 2 12.28 2 8.5 2 6.02 3.99 4 6.44 4c1.54 0 3.04.74 3.96 1.92C11.32 4.74 12.82 4 14.36 4 16.81 4 18.8 6.02 18.8 8.5c0 3.78-3.14 6.86-8.9 11.83l-.8.72z"/>
          </svg>
        </p>
        <div class="flex justify-center items-center space-x-8 text-gray-400">
          <span class="text-sm">✓ Secure Processing</span>
          <span class="text-sm">✓ No File Storage</span>
          <span class="text-sm">✓ Instant Results</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Page is automatically server-side rendered by Nuxt
</script>
