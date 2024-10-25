const schema = {}

/**
 * Checklist Schema Composable
 * Non-reactive because schema is should be read-only after generated from JSON
 *
 * @param {*} rawJson
 * @returns {Object} with `schema`
 */
export const useChecklistSchema = (rawJson) => {
  // console.log('🐛 useChecklistSchema()')

  rawJson.items.forEach(function(item) {
    const catKey = toLowerDashed(item.category)
    const subcatKey = toLowerDashed(item.subcategory)

    if (!_hasCategory (catKey)) {
      schema[catKey] = {
        title: item.category,
        'subcategories': {}
      }
    }

    if (!_hasSubcategory (catKey, subcatKey)) {
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
function _hasCategory (categoryKey) {
  return schema.hasOwnProperty(categoryKey)
}

  /**
 * Checks if subcategory exists in schema
 * @param {String} catKey
 * @param {String} subcatKey
 * @returns Boolean
 */
function _hasSubcategory (catKey, subcatKey) {
  return schema.hasOwnProperty(catKey)
    && schema[catKey].subcategories.hasOwnProperty(subcatKey)
}
