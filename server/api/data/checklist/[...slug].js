const mapping = {
  'landing-zone': 'alz_checklist.en.json',
  'cost': 'cost_checklist.en.json',
  'multitenancy': 'multitenancy_checklist.en.json'
}

export default defineEventHandler(async (event) => {
  const key = event.context.params.slug
  const data = Object.hasOwn(mapping, key)
   ? await useStorage('assets:server').getItem(mapping[key])
   : { error: 'checklist data source not found' }

  return {
    slug: event.context.params.slug,
    data: data
  }
})