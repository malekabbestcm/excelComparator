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
  const normalized =
    resp?.status === 'success'
      ? resp
      : {
          status: 'success',
          data: {
            added: resp?.output?.added || [],
            removed: resp?.output?.removed || [],
            changed: resp?.output?.changed || resp?.output?.updated || [],
            summary: {
              total_added: (resp?.output?.added || []).length,
              total_removed: (resp?.output?.removed || []).length,
              total_changed:
                (resp?.output?.changed || resp?.output?.updated || []).length
            }
          }
        }
  return normalized
});
