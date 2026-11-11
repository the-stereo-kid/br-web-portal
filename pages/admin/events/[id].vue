<template>
  <main class="bg-stone-100 min-h-screen px-4 sm:px-6 lg:px-8 py-10">
    <div class="max-w-3xl mx-auto">
      <NuxtLink to="/admin" class="text-sm underline text-stone-700">← All events</NuxtLink>
      <h1 class="text-3xl font-serif font-bold text-stone-800 mt-2 mb-8">{{ form.id ? 'Edit event' : 'New event' }}</h1>

      <p v-if="loading" class="text-stone-700">Loading…</p>

      <form v-else class="space-y-8" @submit.prevent="save">
        <fieldset :class="card">
          <legend :class="legend">Basics</legend>
          <label class="block">
            <span :class="label">Title</span>
            <input v-model="form.title" required :class="input" />
          </label>
          <label class="block">
            <span :class="label">Page address (leave blank to make it from the title)</span>
            <input v-model="form.slug" placeholder="spirit-of-pamoja" :class="input" />
          </label>
          <div class="grid sm:grid-cols-2 gap-4">
            <label class="block">
              <span :class="label">Starts (South African time)</span>
              <input v-model="form.starts_local" required type="datetime-local" :class="input" />
            </label>
            <label class="block">
              <span :class="label">Ends</span>
              <input v-model="form.ends_local" required type="datetime-local" :class="input" />
            </label>
          </div>
          <label class="block">
            <span :class="label">Location</span>
            <input v-model="form.location" :class="input" />
          </label>
          <div class="grid sm:grid-cols-2 gap-4">
            <label class="block">
              <span :class="label">Status</span>
              <select v-model="form.status" :class="input">
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published</option>
              </select>
            </label>
            <label class="block">
              <span :class="label">Whose event</span>
              <select v-model="form.source" :class="input">
                <option value="own">Brothers Rising</option>
                <option value="community">Community event</option>
              </select>
            </label>
          </div>
          <div>
            <label class="block">
              <span :class="label">Hero image (JPEG, PNG or WebP, under 4 MB)</span>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" class="block text-sm" @change="upload" />
            </label>
            <p v-if="uploading" class="text-sm text-stone-700 mt-2">Uploading…</p>
            <img v-if="form.hero_image_url" :src="form.hero_image_url" alt="Hero image preview" class="mt-3 h-32 rounded border border-stone-300 object-cover" />
          </div>
        </fieldset>

        <fieldset v-for="b in form.blocks" :key="b.type" :class="card">
          <legend :class="legend">{{ BLOCK_LABELS[b.type] }}</legend>
          <label v-if="!REQUIRED_BLOCKS.includes(b.type)" class="flex items-center gap-2 text-sm text-stone-800">
            <input v-model="b.enabled" type="checkbox" class="w-5 h-5" /> Show this section
          </label>
          <template v-if="b.enabled">
            <label v-for="f in FIELDS[b.type]" :key="f.key" class="block">
              <span :class="label">{{ f.label }}</span>
              <textarea v-if="f.rows" v-model="b.data[f.key]" :rows="f.rows" :class="input" />
              <input v-else v-model="b.data[f.key]" :class="input" />
            </label>
          </template>

          <!-- Booking settings live with the commit block -->
          <template v-if="b.type === 'commit'">
            <label class="block">
              <span :class="label">How people book</span>
              <select v-model="form.cta_mode" :disabled="form.source === 'community'" :class="input">
                <option value="tickets">Paid tickets on this site</option>
                <option value="rsvp">Free RSVP on this site</option>
                <option value="external">External booking link</option>
              </select>
            </label>
            <label v-if="mode === 'external'" class="block">
              <span :class="label">Booking link</span>
              <input v-model="form.external_url" type="url" placeholder="https://" :class="input" />
            </label>
            <template v-else>
              <p class="text-sm text-stone-700">
                Tiers sell in order: the first one with places left that hasn't closed is on sale. Put early bird first.
              </p>
              <div v-for="(t, i) in form.tiers" :key="i" class="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr_2fr_auto] gap-3 items-end border-t border-stone-200 pt-3">
                <label class="block col-span-2 sm:col-span-1">
                  <span :class="label">Tier name</span>
                  <input v-model="t.name" required :class="input" />
                </label>
                <label v-if="mode === 'tickets'" class="block">
                  <span :class="label">Price (R)</span>
                  <input v-model.number="t.price" required type="number" min="0" step="0.01" :class="input" />
                </label>
                <label class="block">
                  <span :class="label">Places</span>
                  <input v-model.number="t.quantity" required type="number" min="0" step="1" :class="input" />
                </label>
                <label class="block">
                  <span :class="label">Closes (optional)</span>
                  <input v-model="t.sales_end_local" type="datetime-local" :class="input" />
                </label>
                <button type="button" class="min-h-[44px] px-3 text-sm underline text-stone-700" @click="form.tiers.splice(i, 1)">Remove</button>
                <p v-if="t.id" class="col-span-full text-xs text-stone-600">{{ t.taken }} booked or on hold</p>
              </div>
              <button type="button" class="min-h-[44px] px-4 border border-stone-400 rounded text-sm font-semibold text-stone-800 hover:bg-stone-50" @click="addTier">
                Add a tier
              </button>
              <label class="flex items-center gap-2 text-sm text-stone-800">
                <input v-model="form.sold_out" type="checkbox" class="w-5 h-5" /> Mark as sold out now, whatever the counts say
              </label>
            </template>
          </template>
        </fieldset>

        <p v-if="error" role="alert" class="text-red-800 bg-red-50 border border-red-200 rounded p-3">{{ error }}</p>
        <p v-if="saved" role="status" class="text-green-900 bg-green-50 border border-green-200 rounded p-3">
          Saved. <NuxtLink :to="`/events/${form.slug}`" target="_blank" class="underline font-semibold">View the page</NuxtLink>
        </p>
        <button type="submit" :disabled="busy || uploading" class="min-h-[48px] px-8 bg-stone-900 hover:bg-stone-800 text-amber-50 font-semibold uppercase text-sm tracking-wide rounded disabled:opacity-60">
          {{ busy ? 'Saving…' : 'Save event' }}
        </button>
      </form>

      <section v-if="form.id && mode !== 'external'" class="mt-12">
        <h2 class="text-2xl font-serif font-bold text-stone-800 mb-4">Who's booked ({{ bookedCount }})</h2>
        <p v-if="!orders.length" class="text-stone-700">No bookings yet.</p>
        <div v-else class="overflow-x-auto bg-white rounded-xl border border-stone-200">
          <table class="w-full text-left text-sm text-stone-800">
            <thead class="bg-stone-50 text-xs uppercase tracking-wide text-stone-700">
              <tr>
                <th class="px-4 py-3">Name</th>
                <th class="px-4 py-3">Email</th>
                <th class="px-4 py-3">Phone</th>
                <th class="px-4 py-3">Tier</th>
                <th class="px-4 py-3">Places</th>
                <th class="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="o in orders" :key="o.id" class="border-t border-stone-200">
                <td class="px-4 py-3">{{ o.name }}</td>
                <td class="px-4 py-3">{{ o.email }}</td>
                <td class="px-4 py-3 whitespace-nowrap">{{ o.phone }}</td>
                <td class="px-4 py-3">{{ o.tier }}</td>
                <td class="px-4 py-3">{{ o.quantity }}</td>
                <td class="px-4 py-3 whitespace-nowrap">{{ STATUS[o.status] }}<template v-if="o.status === 'paid'"> · {{ rand(o.amount_cents) }}</template></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({ title: 'Edit event | Brothers Rising', meta: [{ name: 'robots', content: 'noindex' }] })

const card = 'bg-white rounded-xl p-6 border border-stone-200 space-y-4'
const legend = 'px-2 text-lg font-serif font-bold text-stone-800'
const label = 'block text-sm font-semibold text-stone-800 mb-1'
const input = 'w-full min-h-[44px] px-3 py-2 border border-stone-400 rounded bg-white text-stone-900 disabled:bg-stone-100'
const STATUS: Record<string, string> = { paid: 'Paid', rsvp: 'RSVP', held: 'Paying now' }

// The editable fields of each block. `rows` makes it a textarea.
const FIELDS: Record<string, { key: string; label: string; rows?: number }[]> = {
  hero: [
    { key: 'subtitle', label: 'Small line under the title (for example the city)' },
    { key: 'tagline', label: 'Tagline' }
  ],
  intro: [
    { key: 'lead', label: 'Opening line', rows: 2 },
    { key: 'body', label: 'Intro paragraph (shown in a card)', rows: 4 }
  ],
  description: [
    { key: 'heading', label: 'Heading (optional)' },
    { key: 'text', label: 'Description. Leave a blank line between paragraphs.', rows: 10 }
  ],
  details: [
    { key: 'duration', label: 'Duration (for example "Full day immersion")' },
    { key: 'investment', label: 'Investment text (leave blank to show the ticket price)' },
    { key: 'note', label: 'Highlighted note (optional)' },
    { key: 'footnote', label: 'Small print (optional)' }
  ],
  provided_bring: [
    { key: 'provided', label: "What's provided, one item per line", rows: 5 },
    { key: 'bring', label: 'What you bring, one item per line', rows: 5 }
  ],
  commit: [{ key: 'heading', label: 'Heading (default: "Ready to commit?")' }]
}

const route = useRoute()
const id = route.params.id as string
const loading = ref(true)
const busy = ref(false)
const uploading = ref(false)
const saved = ref(false)
const error = ref('')
const orders = ref<any[]>([])

const form = reactive<any>({
  id: null,
  title: '',
  slug: '',
  status: 'draft',
  source: 'own',
  starts_local: '',
  ends_local: '',
  location: '',
  hero_image_url: '',
  cta_mode: 'tickets',
  external_url: '',
  sold_out: false,
  blocks: defaultBlocks(),
  tiers: []
})

// Community events can only link out; we never take money on someone else's behalf.
const mode = computed(() => (form.source === 'community' ? 'external' : form.cta_mode))
const bookedCount = computed(() => orders.value.filter((o) => o.status !== 'held').reduce((n, o) => n + o.quantity, 0))
const addTier = () => form.tiers.push({ name: '', price: 0, quantity: 0, sales_end_local: '' })

const fail = (err: any) => {
  if (err?.statusCode === 401) return navigateTo('/admin/login')
  error.value = err?.data?.message || err?.message || 'Something went wrong'
}

function fill(ev: any, copy = false) {
  Object.assign(form, {
    id: copy ? null : ev.id,
    title: ev.title,
    slug: copy ? '' : ev.slug,
    status: copy ? 'draft' : ev.status,
    source: ev.source,
    starts_local: ev.starts_local,
    ends_local: ev.ends_local,
    location: ev.location,
    hero_image_url: ev.hero_image_url,
    cta_mode: ev.cta_mode,
    external_url: ev.external_url,
    sold_out: copy ? false : ev.sold_out,
    blocks: mergeBlocks(ev.blocks),
    tiers: ev.tiers.map((t: any) => ({
      id: copy ? undefined : t.id,
      name: t.name,
      price: t.price_cents / 100,
      quantity: t.quantity,
      sales_end_local: copy ? '' : t.sales_end_local,
      taken: t.taken
    }))
  })
  orders.value = copy ? [] : ev.orders
}

onMounted(async () => {
  // "new?from=12" starts a new draft as a copy of event 12 (used for the fortnightly circles).
  const source = id === 'new' ? route.query.from : id
  try {
    if (source) fill(await $fetch(`/api/admin/events/${source}`), id === 'new')
    else await $fetch('/api/admin/me')
  } catch (err) {
    await fail(err)
  }
  loading.value = false
})

async function upload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = true
  error.value = ''
  try {
    const body = new FormData()
    body.append('file', file)
    form.hero_image_url = (await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body })).url
  } catch (err) {
    await fail(err)
  }
  uploading.value = false
}

async function save() {
  busy.value = true
  saved.value = false
  error.value = ''
  try {
    const res = await $fetch<{ id: number; slug: string }>('/api/admin/events', {
      method: 'POST',
      body: {
        ...form,
        cta_mode: mode.value,
        tiers: form.tiers.map((t: any) => ({ ...t, price_cents: Math.round((Number(t.price) || 0) * 100) }))
      }
    })
    if (!form.id) return navigateTo(`/admin/events/${res.id}`)
    fill(await $fetch(`/api/admin/events/${res.id}`))
    saved.value = true
  } catch (err) {
    await fail(err)
  }
  busy.value = false
}
</script>
