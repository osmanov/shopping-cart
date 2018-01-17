import isArray from 'lodash.isarray'
import uniqWith from 'lodash.uniqwith'
function addToArray(val1, val2) {
  return isArray(val1) ? val1.concat(val2) : [val1].concat(val2)
}

function modifyObjs(a, b) {
  b.price = addToArray(b.price, a.price)
  return true
}

function predicateAndModifier(a, b) {
  return a.title === b.title && a.id === b.id && modifyObjs(a, b)
}
export const mergeItemsByIds = items => uniqWith(items, predicateAndModifier)
