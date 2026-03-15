import { defineEventHandler, readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const parts = await readMultipartFormData(event)
  const fd = new FormData()
  for (const part of parts || []) {
    if (part.type && part.filename && part.data) {
      const blob = new Blob([part.data], { type: part.type })
      fd.append('data', blob, part.filename)
    }
  }
  const resp: any = await $fetch(config.public.n8nWebhookUrl, {
    method: 'POST',
    body: fd
  })

  if (resp?.status === 'error') return resp

  const container = resp?.data ?? resp?.output ?? resp ?? {}
  const added = container?.added ?? []
  const removed = container?.removed ?? []
  const changed =
    container?.changed ??
    container?.modified ??
    container?.updated ??
    container?.modifications ??
    []

  const summary =
    container?.summary ?? {
      total_added: Array.isArray(added) ? added.length : 0,
      total_removed: Array.isArray(removed) ? removed.length : 0,
      total_changed: Array.isArray(changed) ? changed.length : 0
    }

  return {
    status: 'success',
    data: {
      added: Array.isArray(added) ? added : [],
      removed: Array.isArray(removed) ? removed : [],
      changed: Array.isArray(changed) ? changed : [],
      summary
    }
  }
});
