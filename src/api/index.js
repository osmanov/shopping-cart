import items from './items.json'
function requestFake(data, time = 1000) {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), time)
  })
}
export function getItems() {
  return requestFake(items)
}
export function postItems(items) {
  alert(JSON.stringify(items))
  return requestFake({ status: 200 })
}
