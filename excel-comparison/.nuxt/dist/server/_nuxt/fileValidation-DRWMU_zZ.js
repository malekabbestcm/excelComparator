import { defineStore } from "pinia";
import { ref, readonly } from "vue";
const useFilesStore = defineStore("files", () => {
  const files = ref([]);
  const comparisonResult = ref(null);
  const isUploading = ref(false);
  const uploadProgress = ref(0);
  const addFiles = (newFiles) => {
    const fileItems = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }));
    files.value = [...files.value, ...fileItems].slice(0, 2);
  };
  const removeFile = (id) => {
    files.value = files.value.filter((file) => file.id !== id);
  };
  const clearFiles = () => {
    files.value = [];
    comparisonResult.value = null;
    uploadProgress.value = 0;
  };
  const setComparisonResult = (result) => {
    comparisonResult.value = result;
  };
  const setUploading = (uploading) => {
    isUploading.value = uploading;
  };
  const setUploadProgress = (progress) => {
    uploadProgress.value = progress;
  };
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
  };
});
const validationRules = {
  maxSize: 10 * 1024 * 1024,
  // 10MB
  allowedTypes: [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // .xlsx
    "application/vnd.ms-excel"
    // .xls
  ]
};
const validateFile = (file) => {
  if (file.size > validationRules.maxSize) {
    return {
      isValid: false,
      error: `File size exceeds 10MB limit`
    };
  }
  if (!validationRules.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Only Excel files (.xlsx, .xls) are allowed"
    };
  }
  return { isValid: true };
};
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
export {
  formatFileSize as f,
  useFilesStore as u,
  validateFile as v
};
//# sourceMappingURL=fileValidation-DRWMU_zZ.js.map
