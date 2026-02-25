export interface ValidationResult {
  isValid: boolean
  error?: string
}

export const validationRules = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel' // .xls
  ],
  maxFiles: 2
}

export const validateFile = (file: File): ValidationResult => {
  // Check file size
  if (file.size > validationRules.maxSize) {
    return {
      isValid: false,
      error: `File size exceeds 10MB limit`
    }
  }

  // Check file type
  if (!validationRules.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only Excel files (.xlsx, .xls) are allowed'
    }
  }

  return { isValid: true }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || ''
}