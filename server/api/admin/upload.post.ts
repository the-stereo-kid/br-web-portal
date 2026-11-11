import { put } from '@vercel/blob'

// Hero image upload. Vercel caps request bodies at 4.5 MB, so larger images must be resized first.
export default defineEventHandler(async (event) => {
  const file = (await readMultipartFormData(event))?.find((p) => p.name === 'file')
  if (!file?.data?.length || !/^image\/(jpeg|png|webp|avif)$/.test(file.type || '')) {
    throw createError({ statusCode: 400, message: 'Upload a JPEG, PNG, WebP or AVIF image' })
  }
  if (file.data.length > 4 * 1024 * 1024) {
    throw createError({ statusCode: 413, message: 'Images must be under 4 MB' })
  }
  const name = (file.filename || 'image').replace(/[^a-zA-Z0-9._-]+/g, '-')
  const blob = await put(`events/${name}`, file.data, { access: 'public', contentType: file.type, addRandomSuffix: true })
  return { url: blob.url }
})
