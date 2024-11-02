import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Checklist Store
 *
 * Read-only "database" of all checklist items.
 */
export const useChecklistStoreV2 = defineStore('ChecklistStoreV2', () => {

  // new props
  const db = ref({})

  /**
   * @function init
   * @param {String} paramsObj.key - key to save checklist data in DB
   * @param {String} paramsObj.source - name of source JSON file, e.g. `multitenancy_checklist.en.json`
   * @returns null
   */
  async function init (paramsObj) {
    const key = paramsObj.key
    console.log(`[💾 ChecklistStoreV2] init(${key})`)

    // if (db.value.hasOwnProperty(key)) {
    //   console.log(`Checklist ${key} already exists`)
    // } else {
    //   console.log(`Checklist ${key} does NOT exist`)
    //   await load(paramsObj)
    // }

    // Debugging: load new every time
    await load(paramsObj)
  }

  /**
   * Loads checklist data from JSON files
   * @param {String} paramsObj.key - key to save checklist data in DB
   * @param {String} paramsObj.source - name of source JSON file, e.g. `multitenancy_checklist.en.json`
   * @returns null
   */
  async function load (paramsObj) {
    console.log('[🐛 ChecklistStore.load()] Got params', { key: paramsObj.key, source: paramsObj.source})

    // -- Setup --
    const url           = useRequestURL() // get hostname
    const sourceParts   = paramsObj.source.split('.')
    // const checklistLang = sourceParts[1]
    // const checklistKey  = `${paramsObj.key}-${checklistLang}`
    const checklistKey  = `${paramsObj.key}`
    const checklistUrl  = `${url.origin}/data/checklists/${paramsObj.source}`

    // -- First reset existing --
    db.value[checklistKey] = {}

    // -- Load data from JSON --
    const { data, error } = await useFetch(checklistUrl)

    if (error.value !== null) {
      console.error('Error', error)
      return // TODO: throw error instead?
    }

    // -- Generate Schema --
    const { schema } = useChecklistSchema(data.value)

    // -- Set DB value --
    db.value[checklistKey] = {
      rawJSON: data.value,
      index: _createGuidIndex(data.value.items),
      metadata: data.value.metadata,
      schema: schema
    }
  }

  /**
   * Get Checklist Schema by key
   *
   * @param {String} checklistKey
   * @returns {Object} non-reactive
   */
  function getSchema (checklistKey) {
    // console.log(`getSchema(${checklistKey})`)
    return db.value[checklistKey]
  }

  function getItemByGuid (checklistKey, guid) {
    // const checklistItems = [guid]
    const index = db.value[checklistKey].index
    const found = Object.hasOwn(index, guid)
    if (!found) {
      console.warn(`[🐛 ChecklistStore] Item ${guid} not found in '${checklistKey}' checklist`)
      return null
    }


    const itemIndex = db.value[checklistKey].index[guid]
    // console.log('itemIndex', itemIndex)
    return db.value[checklistKey].rawJSON.items[itemIndex]
    // return '#foo'
  }

  /**
   * Resets Store Database
   * Useful if checklist source JSON changed.
   */
  function $reset ()  {
    console.log(`[🐛 ChecklistStore] $reset()`)
    db.value = {}
  }

  /**
   * ------------
   *  Expose API
   * ------------
   */

  return {
    db,
    init,
    load,
    getSchema,
    getItemByGuid,
    $reset
  }
})


/**
 * Creates an index of checklist items by their Guid
 * and position in items array.
 *
 * @param {Array} itemsArray
 * @returns {Object}
 */
function _createGuidIndex (itemsArray) {
  const index = {}
  itemsArray.forEach ((item, i) => {
    index[item.guid] = i
  })

  return index
}