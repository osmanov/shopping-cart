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

function stableSort(arr, compare) {
  const original = arr.slice(0)

  arr.sort(function(a, b) {
    const result = compare(a, b)
    return result === 0 ? original.indexOf(a) - original.indexOf(b) : result
  })

  return arr
}

export const sort = (items, name, orderBy = 'ask') => {
  if (orderBy === 'ask') {
    return stableSort(
      items,
      (a, b) => (a[name] > b[name] ? 1 : a[name] < b[name] ? -1 : 0)
    )
  }
  return stableSort(
    items,
    (a, b) => (a[name] < b[name] ? 1 : a[name] > b[name] ? -1 : 0)
  )
}
