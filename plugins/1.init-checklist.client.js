import { useChecklistStore } from '~/stores/ChecklistStore'

export default defineNuxtPlugin(async (app) => {
  log.frontend(`[🔌 Plugin] initialize checklist store`)

  const checklistStore = useChecklistStore(app.$pinia)
  await checklistStore.init()
})