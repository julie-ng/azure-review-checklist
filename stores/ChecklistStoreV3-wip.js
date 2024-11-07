import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChecklistStoreV3 = defineStore('ChecklistStoreV3', () => {
  const db = ref({})

  function addCategories (slug, contentList) {
    console.log(`[🐞] checklistStore.addCategories(${slug})`)
    // const listDB = db.value[slug]
    // listDB.categories = {}
    // listDB.subcategories = {}

    // contentList.value.forEach((p) => {
    //   const parts = p._path.split('/')
    //   const isCategory = parts.length === 4
    //   const isSubcategory = parts.length === 5

    //   if (isCategory) {
    //     listDB.categories[p._path] = p
    //   }
    //   if (isSubcategory) {
    //     listDB.subcategories[p._path] = p
    //   }
    // })
  }

  function addItems (slug, contentList) {
    console.log(`[🐞] checklistStore.addItems(${slug})`)
    const listDB = db.value[slug]
    listDB.items = {}

    contentList.value.forEach((p) => {
      listDB.items[p._path] = p
    })
  }

  /**
   * Returns specific checklist
   *
   * @param {String} checklistKey - e.g. `landing-zone`
   * @returns
   */
  function getList (checklistKey) {
    return db.value[checklistKey]
  }

  /**
   * Checks if checklists data already exists
   * @param {String} key
   * @returns {Boolean}
   */
  function exists (checklistKey) {
    return Object.hasOwn(db.value, checklistKey)
  }

  /**
   * Resets DB for a particular checklist
   *
   * @param {String} checklistKey
   */
  function reset (checklistKey) {
    db.value[checklistKey] = {}
  }

  function $reset ()  {
    console.log(`[🐛 ChecklistStoreV3] $reset()`)
    db.value = {}
  }

  return {
    // db,
    addCategories,
    addItems,
    getList,
    exists,
    $reset
  }
})