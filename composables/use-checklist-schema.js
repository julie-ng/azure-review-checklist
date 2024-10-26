/**
 * Checklist Schema Composable
 * Non-reactive because schema is should be read-only after generated from JSON
 *
 * @param {*} rawJson
 * @returns {Object} with `schema`
 */
export const useChecklistSchema = (rawJson) => {
  // console.log('[🐛 useChecklistSchema()]')

  // reset schema
  const schema = {}

  rawJson.items.forEach(function(item) {
    const catKey = toLowerDashed(item.category)
    const subcatKey = toLowerDashed(item.subcategory)

    if (!_hasCategory (schema, catKey)) {
      schema[catKey] = {
        title: item.category,
        'subcategories': {}
      }
    }

    if (!_hasSubcategory (schema, catKey, subcatKey)) {
      schema[catKey].subcategories[subcatKey] =  {
        title: item.subcategory,
        items: []
      }
    }

    schema[catKey].subcategories[subcatKey].items.push(item)
  })

  return {
    schema
  }
}
/**
 * ---------
 *  Helpers
 * ---------
 */

/**
 * Checks if category exists in schema
 * @param {String} categoryKey for lookup in object
 * @returns Boolean
 */
function _hasCategory (schema, categoryKey) {
  return schema.hasOwnProperty(categoryKey)
}

  /**
 * Checks if subcategory exists in schema
 * @param {String} catKey
 * @param {String} subcatKey
 * @returns Boolean
 */
function _hasSubcategory (schema, catKey, subcatKey) {
  return schema.hasOwnProperty(catKey)
    && schema[catKey].subcategories.hasOwnProperty(subcatKey)
}
