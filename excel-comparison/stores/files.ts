import { defineStore } from 'pinia'

export interface FileItem {
  id: string
  name: string
  size: number
  type: string
  file: File
}

export interface ComparisonResult {
  status: 'success' | 'error'
  data?: {
    added: any[]
    removed: any[]
    changed: any[]
  }
  message?: string
  code?: string
}

export const useFilesStore = defineStore('files', () => {
  const files = ref<FileItem[]>([])
  const comparisonResult = ref<ComparisonResult | null>(null)
  const isUploading = ref(false)
  const uploadProgress = ref(0)

  const addFiles = (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }))
    
    files.value = [...files.value, ...fileItems].slice(0, 2) // Max 2 files
  }

  const removeFile = (id: string) => {
    files.value = files.value.filter(file => file.id !== id)
  }

  const clearFiles = () => {
    files.value = []
    comparisonResult.value = null
    uploadProgress.value = 0
  }

  const setComparisonResult = (result: ComparisonResult) => {
    comparisonResult.value = result
  }

  const setUploading = (uploading: boolean) => {
    isUploading.value = uploading
  }

  const setUploadProgress = (progress: number) => {
    uploadProgress.value = progress
  }

  return {
    files: readonly(files),
    comparisonResult: readonly(comparisonResult),
    isUploading: readonly(isUploading),
    uploadProgress: readonly(uploadProgress),
    addFiles,
    removeFile,
    clearFiles,
    setComparisonResult,
    setUploading,
    setUploadProgress
  }
})