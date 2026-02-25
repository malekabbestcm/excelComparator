import { useFilesStore } from '~/stores/files'
import { validateFile, ValidationResult } from '~/utils/fileValidation'

export const useFileUpload = () => {
  const store = useFilesStore()
  const config = useRuntimeConfig()
  
  const uploadFiles = async (): Promise<void> => {
    if (store.files.length !== 2) {
      throw new Error('Please select exactly 2 Excel files')
    }

    // Validate all files
    for (const fileItem of store.files) {
      const validation: ValidationResult = validateFile(fileItem.file)
      if (!validation.isValid) {
        throw new Error(validation.error)
      }
    }

    store.setUploading(true)
    store.setUploadProgress(0)

    try {
      const formData = new FormData()
      store.files.forEach(fileItem => {
        formData.append('data', fileItem.file)
      })

      const response = await $fetch(config.public.n8nWebhookUrl, {
        method: 'POST',
        body: formData,
        onRequest({ request }) {
          store.setUploadProgress(50)
        }
      })

      store.setUploadProgress(100)
      store.setComparisonResult(response as any)
      await navigateTo('/results')
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    } finally {
      store.setUploading(false)
    }
  }

  const handleFileDrop = (event: DragEvent) => {
    event.preventDefault()
    
    const droppedFiles = Array.from(event.dataTransfer?.files || [])
    const excelFiles = droppedFiles.filter(file => 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    )
    
    if (excelFiles.length > 0) {
      store.addFiles(excelFiles)
    }
  }

  const handleFileInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const selectedFiles = Array.from(target.files || [])
    
    if (selectedFiles.length > 0) {
      store.addFiles(selectedFiles)
    }
  }

  return {
    uploadFiles,
    handleFileDrop,
    handleFileInput
  }
}
