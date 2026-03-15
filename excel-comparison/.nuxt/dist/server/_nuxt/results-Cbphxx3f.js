import { defineComponent, computed, mergeProps, unref, useSSRContext, ref, withAsyncContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { u as useFilesStore, f as formatFileSize } from "./fileValidation-DRWMU_zZ.js";
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
  __name: "SummaryCards",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFilesStore();
    const comparisonResult = computed(() => store.comparisonResult);
    const addedCount = computed(() => {
      return comparisonResult.value?.data?.added?.length || 0;
    });
    const removedCount = computed(() => {
      return comparisonResult.value?.data?.removed?.length || 0;
    });
    const changedCount = computed(() => {
      return comparisonResult.value?.data?.changed?.length || 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid md:grid-cols-3 gap-6" }, _attrs))}><div class="card border-l-4 border-green-500"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600">Added Items</p><p class="text-3xl font-bold text-green-600">${ssrInterpolate(unref(addedCount))}</p></div><div class="bg-green-100 rounded-full p-3"><svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div></div><div class="mt-4"><p class="text-sm text-gray-600"> New items found in the second file </p></div></div><div class="card border-l-4 border-red-500"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600">Removed Items</p><p class="text-3xl font-bold text-red-600">${ssrInterpolate(unref(removedCount))}</p></div><div class="bg-red-100 rounded-full p-3"><svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></div></div><div class="mt-4"><p class="text-sm text-gray-600"> Items removed from the first file </p></div></div><div class="card border-l-4 border-amber-500"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600">Changed Items</p><p class="text-3xl font-bold text-amber-600">${ssrInterpolate(unref(changedCount))}</p></div><div class="bg-amber-100 rounded-full p-3"><svg class="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg></div></div><div class="mt-4"><p class="text-sm text-gray-600"> Items modified between files </p></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SummaryCards.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DiffViewer",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const store = useFilesStore();
    const comparisonResult = computed(() => store.comparisonResult);
    const expandedSections = ref({
      added: true,
      removed: true,
      changed: true
    });
    const addedItems = computed(() => {
      return comparisonResult.value?.data?.added || [];
    });
    const removedItems = computed(() => {
      return comparisonResult.value?.data?.removed || [];
    });
    const normalizeChangedItem = (item) => {
      if (!item || typeof item !== "object") return { key: null, changes: [], before: item, after: item };
      const key = item.key ?? item.id ?? item.ID ?? item.code ?? item.sku ?? null;
      const changes = Array.isArray(item.changes) ? item.changes : Array.isArray(item.diff) ? item.diff : [];
      const before = item.before ?? item.rowA ?? item.a ?? item.original ?? item.from ?? item.old ?? null;
      const after = item.after ?? item.rowB ?? item.b ?? item.modified ?? item.to ?? item.new ?? null;
      return { ...item, key, changes, before, after };
    };
    const changedItems = computed(() => {
      const raw = comparisonResult.value?.data?.changed || [];
      return raw.map(normalizeChangedItem);
    });
    const noChanges = computed(() => {
      return addedItems.value.length === 0 && removedItems.value.length === 0 && changedItems.value.length === 0;
    });
    const formatJson = (obj) => {
      try {
        return JSON.stringify(obj, null, 2);
      } catch {
        return String(obj);
      }
    };
    const expandAll = () => {
      expandedSections.value = {
        added: true,
        removed: true,
        changed: true
      };
    };
    const collapseAll = () => {
      expandedSections.value = {
        added: false,
        removed: false,
        changed: false
      };
    };
    __expose({
      expandAll,
      collapseAll
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (unref(addedItems).length > 0) {
        _push(`<div class="border border-green-200 rounded-lg overflow-hidden"><button class="w-full px-4 py-3 bg-green-50 text-green-800 font-medium flex items-center justify-between hover:bg-green-100 transition-colors"><span class="flex items-center"><svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Added Items (${ssrInterpolate(unref(addedItems).length)}) </span><svg class="${ssrRenderClass([{ "rotate-180": unref(expandedSections).added }, "h-5 w-5 transform transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="bg-white p-4" style="${ssrRenderStyle(unref(expandedSections).added ? null : { display: "none" })}"><div class="space-y-2 max-h-96 overflow-y-auto"><!--[-->`);
        ssrRenderList(unref(addedItems), (item, index) => {
          _push(`<div class="p-3 bg-green-50 border border-green-200 rounded-lg"><pre class="text-sm text-green-800 overflow-x-auto">${ssrInterpolate(formatJson(item))}</pre></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(removedItems).length > 0) {
        _push(`<div class="border border-red-200 rounded-lg overflow-hidden"><button class="w-full px-4 py-3 bg-red-50 text-red-800 font-medium flex items-center justify-between hover:bg-red-100 transition-colors"><span class="flex items-center"><svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg> Removed Items (${ssrInterpolate(unref(removedItems).length)}) </span><svg class="${ssrRenderClass([{ "rotate-180": unref(expandedSections).removed }, "h-5 w-5 transform transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="bg-white p-4" style="${ssrRenderStyle(unref(expandedSections).removed ? null : { display: "none" })}"><div class="space-y-2 max-h-96 overflow-y-auto"><!--[-->`);
        ssrRenderList(unref(removedItems), (item, index) => {
          _push(`<div class="p-3 bg-red-50 border border-red-200 rounded-lg"><pre class="text-sm text-red-800 overflow-x-auto">${ssrInterpolate(formatJson(item))}</pre></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(changedItems).length > 0) {
        _push(`<div class="border border-amber-200 rounded-lg overflow-hidden"><button class="w-full px-4 py-3 bg-amber-50 text-amber-800 font-medium flex items-center justify-between hover:bg-amber-100 transition-colors"><span class="flex items-center"><svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg> Changed Items (${ssrInterpolate(unref(changedItems).length)}) </span><svg class="${ssrRenderClass([{ "rotate-180": unref(expandedSections).changed }, "h-5 w-5 transform transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="bg-white p-4" style="${ssrRenderStyle(unref(expandedSections).changed ? null : { display: "none" })}"><div class="space-y-4 max-h-96 overflow-y-auto"><!--[-->`);
        ssrRenderList(unref(changedItems), (item, index) => {
          _push(`<div class="p-3 bg-amber-50 border border-amber-200 rounded-lg">`);
          if (item.key) {
            _push(`<div class="mb-2"><span class="text-sm font-medium text-amber-800">Key: ${ssrInterpolate(item.key)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (item.changes && item.changes.length) {
            _push(`<div class="mb-3"><p class="text-xs font-medium text-gray-600 mb-1">Changes:</p><div class="space-y-1"><!--[-->`);
            ssrRenderList(item.changes, (change, changeIndex) => {
              _push(`<div class="text-xs text-gray-700"><span class="font-medium">${ssrInterpolate(change.field)}:</span><span class="text-red-700 ml-1">${ssrInterpolate(formatJson(change.from))}</span><span class="mx-1">→</span><span class="text-green-700">${ssrInterpolate(formatJson(change.to))}</span></div>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grid md:grid-cols-2 gap-4"><div><p class="text-xs font-medium text-gray-600 mb-1">Before:</p><pre class="text-sm text-red-700 bg-red-50 p-2 rounded border border-red-200 overflow-x-auto">${ssrInterpolate(formatJson(item.before))}</pre></div><div><p class="text-xs font-medium text-gray-600 mb-1">After:</p><pre class="text-sm text-green-700 bg-green-50 p-2 rounded border border-green-200 overflow-x-auto">${ssrInterpolate(formatJson(item.after))}</pre></div></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(noChanges)) {
        _push(`<div class="text-center py-12"><div class="bg-gray-50 rounded-lg p-8"><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">No Changes Found</h3><p class="text-gray-600">The files appear to be identical or contain no comparable data.</p></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DiffViewer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "results",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const store = useFilesStore();
    const files = computed(() => store.files);
    const comparisonResult = computed(() => store.comparisonResult);
    if (!comparisonResult.value) {
      [__temp, __restore] = withAsyncContext(() => navigateTo("/")), await __temp, __restore();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SummaryCards = _sfc_main$2;
      const _component_DiffViewer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-primary-50 to-blue-50" }, _attrs))}><header class="bg-white shadow-sm border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center py-6"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><div class="ml-4"><h1 class="text-2xl font-bold text-gray-900">Excel Compare</h1><p class="text-sm text-gray-600">Professional Excel file comparison tool</p></div></div><div class="flex items-center space-x-4"><button class="btn-secondary"><svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Upload New Files </button><button class="btn-primary"><svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Download Results </button></div></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="text-center mb-8"><h2 class="text-3xl font-bold text-gray-900 mb-4">Comparison Results</h2><p class="text-lg text-gray-600"> Detailed analysis of differences between your Excel files </p></div>`);
      _push(ssrRenderComponent(_component_SummaryCards, { class: "mb-8" }, null, _parent));
      _push(`<div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="card"><div class="flex justify-between items-center mb-6"><h3 class="text-xl font-bold text-gray-900">Detailed Changes</h3><div class="flex space-x-2"><button class="text-sm text-primary-600 hover:text-primary-700"> Expand All </button><button class="text-sm text-primary-600 hover:text-primary-700"> Collapse All </button></div></div>`);
      _push(ssrRenderComponent(_component_DiffViewer, null, null, _parent));
      _push(`</div></div><div class="space-y-6"><div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-4">Files Compared</h3><div class="space-y-3"><!--[-->`);
      ssrRenderList(unref(files), (file) => {
        _push(`<div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"><svg class="h-6 w-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><div class="min-w-0"><p class="text-sm font-medium text-gray-900 truncate">${ssrInterpolate(file.name)}</p><p class="text-xs text-gray-500">${ssrInterpolate(unref(formatFileSize)(file.size))}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-4">Processing Details</h3><div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-600">Status:</span><span class="text-green-600 font-medium">Completed</span></div><div class="flex justify-between"><span class="text-gray-600">Method:</span><span class="text-gray-900">n8n Webhook</span></div><div class="flex justify-between"><span class="text-gray-600">Format:</span><span class="text-gray-900">JSON Diff</span></div></div></div></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/results.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=results-Cbphxx3f.js.map
