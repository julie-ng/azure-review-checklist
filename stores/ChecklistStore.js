import { ref } from 'vue'
import { defineStore, skipHydrate } from 'pinia'

const LOCAL_STORAGE_KEY = 'app-checklist-model'
const LZ_CHECKLIST_DATA_URL = '/api/data/checklist/landing-zone'

/**
 * Checklist Store
 *
 * Read-only "database" of all checklist items.
 */
export const useChecklistStore = defineStore('ChecklistStore', () => {
  const rawJson = ref({})
  const list = ref({})
  const categories = ref({})
  const subcategories = ref({})

  const version = ref('')
  const versionShort = computed(() => version.value.slice(0, 8))

  const ready = ref(false)
  const isReady = computed(() => ready.value)

  /**
   * @function init
   * @returns null
   */
  async function init () {
    log.frontend('[📀 ChecklistStore]  init()')
    const { data, error } = await useFetch(LZ_CHECKLIST_DATA_URL)

    if (error.value !== null) {
      console.error('Error', error)
    }

    rawJson.value = data.value
    version.value = data.value.hash

    log.frontend(data.value)

    initModel()

    ready.value = true
  }

  /**
   * Process Raw JSON to App Model
   * Populates categories and subcategories refs
   */
  function initModel () {
    rawJson.value.items.forEach(function(item) {
      const catKey = toLowerDashed(item.category)
      const subcatKey = toLowerDashed(item.subcategory)

      if (!_hasCategory (catKey)) {
        console.log(`🔴 missing ${catKey}`);
        list.value[catKey] = {}
        categories.value[catKey] = item.category
      } else {
        console.log(`🟢 got ${catKey}`);
      }

      if (!_hasSubcategory (catKey, subcatKey)) {
        console.log(`🔴 missing ${subcatKey} in ${catKey}`);
        list.value[catKey][subcatKey] = []
        subcategories.value[subcatKey] = item.subcategory
      } else {
        console.log(`🟢 got ${subcatKey} in ${catKey}`);
      }
      list.value[catKey][subcatKey].push(item)
    })
  }


   /**
   * Reset Local Storage
   */
   async function $reset() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    await init()
  }

  /**
   * ---------
   *  Helpers
   * ---------
   */

  /**
   * Checks if category exists in `items`
   * @param {String} categoryKey for lookup in object
   * @returns Boolean
   */
  function _hasCategory (categoryKey) {
    return list.value.hasOwnProperty(categoryKey)
  }

    /**
   * Checks if subcategory exists in `items[category]`
   * @param {String} catKey
   * @param {String} subcatKey
   * @returns Boolean
   */
  function _hasSubcategory (catKey, subcatKey) {
    return list.value.hasOwnProperty(catKey) && list.value[catKey].hasOwnProperty(subcatKey)
  }


  /**
   * ------------
   *  Expose API
   * ------------
   */

  return {
    list,
    categories,
    subcategories,
    version: skipHydrate(version),
    versionShort: skipHydrate(versionShort),
    init,
    isReady,
    $reset
  }
})
