export default defineEventHandler(async () => {
  const data = await useStorage('assets:server').getItem(`alz_checklist.en.json`)
  return data
})