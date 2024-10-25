import { ref } from 'vue'
import { defineStore, skipHydrate } from 'pinia'

/**
 * Checklist Store
 *
 * Read-only "database" of all checklist items.
 */
export const useChecklistStoreV2 = defineStore('ChecklistStoreV2', () => {

  // new props
  const db = ref({})

  // old props
  const version = ref('')
  const versionShort = computed(() => version.value.slice(0, 8))
  // /old


  /**
   * @function init
   * @returns null
   */
  async function init (key) {
    log.frontend(`[💾 ChecklistStoreV2] init(${key})`)
  }

  /**
   * Loads checklist data from JSON files
   * @param {String} paramsObj.key - key to save checklist data in DB
   * @param {String} paramsObj.source - name of source JSON file, e.g. `multitenancy_checklist.en.json`
   * @returns null
   */
  async function load (paramsObj) {
    const url           = useRequestURL() // get hostname
    const sourceParts   = paramsObj.source.split('.')
    const checklistLang = sourceParts[1]
    const checklistKey  = `${paramsObj.key}-${checklistLang}`
    const checklistUrl  = `${url.origin}/data/checklists/${paramsObj.source}`

    // console.log('Got params', { key: paramsObj.key, source: paramsObj.source, lang: checklistLang})
    console.log('Loading…', checklistUrl)
    const { data, error } = await useFetch(checklistUrl)

    if (error.value !== null) {
      console.error('Error', error)
      return // TODO: throw error instead?
    }

    const { schema } = useChecklistSchema(data.value)
    console.log('🐞 schema', schema)

    db.value[checklistKey] = {
      rawJSON: data.value,
      metadata: data.value.metadata,
      schema: schema
    }
  }

  // function createSchema (rawJson) {

  //   // TODO: rename
  //   // const cats = {}
  //   // const subcats = {}
  //   // const itemsList = [] // need this ??

  //   // rawJson.items.forEach(function(item) {
  //   //   const catKey = toLowerDashed(item.category)
  //   //   const subcatKey = toLowerDashed(item.subcategory)

  //   //   if (!_hasCategory (catKey)) {
  //   //     list.value[catKey] = {}
  //   //     categories.value[catKey] = item.category
  //   //   }

  //   //   if (!_hasSubcategory (catKey, subcatKey)) {
  //   //     list.value[catKey][subcatKey] = []
  //   //     subcategories.value[subcatKey] = item.subcategory
  //   //   }

  //   //   list.value[catKey][subcatKey].push(item)
  //   // })
  // }


   /**
   * Reset Local Storage
   */
  //  async function $reset() {
  //   localStorage.removeItem(LOCAL_STORAGE_KEY)
  //   await init()
  // }


  /**
   * ------------
   *  Expose API
   * ------------
   */

  return {
    db,
    init,
    load,
    // $reset
  }
})
