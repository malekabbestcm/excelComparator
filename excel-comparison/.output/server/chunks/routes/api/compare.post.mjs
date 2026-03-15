import { d as defineEventHandler, r as readMultipartFormData, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const compare_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const config = useRuntimeConfig();
  const parts = await readMultipartFormData(event);
  const fd = new FormData();
  for (const part of parts || []) {
    if (part.type && part.filename && part.data) {
      const blob = new Blob([part.data], { type: part.type });
      fd.append("data", blob, part.filename);
    }
  }
  const resp = await $fetch(config.public.n8nWebhookUrl, {
    method: "POST",
    body: fd
  });
  if ((resp == null ? void 0 : resp.status) === "error") return resp;
  const container = (_c = (_b = (_a = resp == null ? void 0 : resp.data) != null ? _a : resp == null ? void 0 : resp.output) != null ? _b : resp) != null ? _c : {};
  const added = (_d = container == null ? void 0 : container.added) != null ? _d : [];
  const removed = (_e = container == null ? void 0 : container.removed) != null ? _e : [];
  const changed = (_i = (_h = (_g = (_f = container == null ? void 0 : container.changed) != null ? _f : container == null ? void 0 : container.modified) != null ? _g : container == null ? void 0 : container.updated) != null ? _h : container == null ? void 0 : container.modifications) != null ? _i : [];
  const summary = (_j = container == null ? void 0 : container.summary) != null ? _j : {
    total_added: Array.isArray(added) ? added.length : 0,
    total_removed: Array.isArray(removed) ? removed.length : 0,
    total_changed: Array.isArray(changed) ? changed.length : 0
  };
  return {
    status: "success",
    data: {
      added: Array.isArray(added) ? added : [],
      removed: Array.isArray(removed) ? removed : [],
      changed: Array.isArray(changed) ? changed : [],
      summary
    }
  };
});

export { compare_post as default };
//# sourceMappingURL=compare.post.mjs.map
