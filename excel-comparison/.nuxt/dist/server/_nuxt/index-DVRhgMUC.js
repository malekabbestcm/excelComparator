import { defineComponent, computed, mergeProps, unref, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { u as useFilesStore, f as formatFileSize, v as validateFile } from "./fileValidation-DRWMU_zZ.js";
import { n as navigateTo } from "../server.mjs";
import "pinia";
import "/Users/maa/Desktop/JF/compareEx/excel-comparison/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/maa/Desktop/JF/compareEx/excel-comparison/node_modules/hookable/dist/index.mjs";
import "/Users/maa/Desktop/JF/compareEx/excel-comparison/node_modules/unctx/dist/index.mjs";
import "/Users/maa/Desktop/JF/compareEx/excel-comparison/node_modules/h3/dist/index.mjs";
import "/Users/maa/Desktop/JF/compareEx/excel-comparison/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/maa/Desktop/JF/compareEx/excel-comparison/node_modules/ufo/dist/index.mjs";
import "/Users/maa/Desktop/JF/compareEx/excel-comparison/node_modules/klona/dist/index.mjs";
import "/Users/maa/Desktop/JF/compareEx/excel-comparison/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FilePreview",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFilesStore();
    const files = computed(() => store.files);
    const getFileValidation = (file) => {
      return validateFile(file);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><h3 class="text-lg font-semibold text-gray-900">Selected Files</h3><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(files), (file) => {
        _push(`<div class="file-item"><div class="flex items-center space-x-3"><div class="flex-shrink-0"><svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900 truncate">${ssrInterpolate(file.name)}</p><p class="text-sm text-gray-500">${ssrInterpolate(unref(formatFileSize)(file.size))}</p></div><button class="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors" title="Remove file"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
        if (getFileValidation(file.file).error) {
          _push(`<div class="mt-2"><p class="text-sm text-red-600">${ssrInterpolate(getFileValidation(file.file).error)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="text-sm text-gray-600">${ssrInterpolate(unref(files).length)} of 2 files selected </div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FilePreview.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useFileUpload = () => {
  const store = useFilesStore();
  const uploadFiles = async () => {
    if (store.files.length !== 2) {
      throw new Error("Please select exactly 2 Excel files");
    }
    for (const fileItem of store.files) {
      const validation = validateFile(fileItem.file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }
    }
    store.setUploading(true);
    store.setUploadProgress(0);
    try {
      const formData = new FormData();
      store.files.forEach((fileItem) => {
        formData.append("data", fileItem.file);
      });
      const response = await $fetch("/api/compare", {
        method: "POST",
        body: formData,
        onRequest() {
          store.setUploadProgress(50);
        }
      });
      store.setUploadProgress(100);
      store.setComparisonResult(response);
      await navigateTo("/results");
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      store.setUploading(false);
    }
  };
  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    const excelFiles = droppedFiles.filter(
      (file) => file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel"
    );
    if (excelFiles.length > 0) {
      store.addFiles(excelFiles);
    }
  };
  const handleFileInput = (event) => {
    const target = event.target;
    const selectedFiles = Array.from(target.files || []);
    if (selectedFiles.length > 0) {
      store.addFiles(selectedFiles);
    }
  };
  return {
    uploadFiles,
    handleFileDrop,
    handleFileInput
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FileUpload",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFilesStore();
    useFileUpload();
    ref();
    const isDragging = ref(false);
    const files = computed(() => store.files);
    const isUploading = computed(() => store.isUploading);
    const uploadProgress = computed(() => store.uploadProgress);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FilePreview = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><h2 class="text-2xl font-bold text-gray-900 mb-6">Upload Excel Files</h2><div class="${ssrRenderClass([{ "active": unref(isDragging) }, "drop-zone"])}"><div class="text-center"><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9.9.9 0 01-.9.9H7z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11v8m0 0l3-3m-3 3l-3-3"></path></svg><p class="text-lg font-medium text-gray-700 mb-2"> Drop your Excel files here, or click to browse </p><p class="text-sm text-gray-500"> Supports .xlsx and .xls formats, up to 10MB per file </p></div><input type="file" multiple accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" class="hidden"></div>`);
      if (unref(files).length > 0) {
        _push(ssrRenderComponent(_component_FilePreview, { class: "mt-6" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-4 mt-6"><button${ssrIncludeBooleanAttr(unref(files).length !== 2 || unref(isUploading)) ? " disabled" : ""} class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (unref(isUploading)) {
        _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Uploading... </span>`);
      } else {
        _push(`<span>Compare Files</span>`);
      }
      _push(`</button><button${ssrIncludeBooleanAttr(unref(files).length === 0 || unref(isUploading)) ? " disabled" : ""} class="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"> Clear Files </button></div>`);
      if (unref(isUploading)) {
        _push(`<div class="mt-4"><div class="flex justify-between text-sm text-gray-600 mb-2"><span>Uploading files...</span><span>${ssrInterpolate(unref(uploadProgress))}%</span></div><div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-primary-600 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(uploadProgress)}%` })}"></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FileUpload.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FileUpload = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-primary-50 to-blue-50" }, _attrs))}><header class="bg-white shadow-sm border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center py-6"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><div class="ml-4"><h1 class="text-2xl font-bold text-gray-900">Excel Compare</h1><p class="text-sm text-gray-600">Professional Excel file comparison tool</p></div></div><div class="flex items-center space-x-4"><button class="text-gray-600 hover:text-gray-900"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button></div></div></div></header><main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4"> Compare Excel Files in Seconds </h2><p class="text-xl text-gray-600 max-w-2xl mx-auto"> Upload two Excel files and get a detailed comparison showing added, removed, and changed data with our advanced n8n-powered processing. </p></div><div class="grid md:grid-cols-3 gap-8 mb-12"><div class="text-center"><div class="bg-primary-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center"><svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9.9.9 0 01-.9.9H7z"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2">Drag &amp; Drop</h3><p class="text-gray-600">Simply drag and drop your Excel files or click to browse</p></div><div class="text-center"><div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center"><svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3><p class="text-gray-600">Get detailed comparison results in seconds with n8n processing</p></div><div class="text-center"><div class="bg-amber-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center"><svg class="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2">Detailed Analysis</h3><p class="text-gray-600">See exactly what changed, was added, or removed between files</p></div></div>`);
      _push(ssrRenderComponent(_component_FileUpload, null, null, _parent));
      _push(`<div class="text-center mt-12"><p class="text-sm mb-4 flex items-center justify-center gap-2"><span class="text-gray-600">Crafted by</span><span class="text-gray-900 font-medium">Malek abbes</span><svg class="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.1 21.35l-1.1-1.02C5.14 15.36 2 12.28 2 8.5 2 6.02 3.99 4 6.44 4c1.54 0 3.04.74 3.96 1.92C11.32 4.74 12.82 4 14.36 4 16.81 4 18.8 6.02 18.8 8.5c0 3.78-3.14 6.86-8.9 11.83l-.8.72z"></path></svg></p><div class="flex justify-center items-center space-x-8 text-gray-400"><span class="text-sm">✓ Secure Processing</span><span class="text-sm">✓ No File Storage</span><span class="text-sm">✓ Instant Results</span></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DVRhgMUC.js.map
