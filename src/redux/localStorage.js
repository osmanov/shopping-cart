export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    console.log('save state problem to localStorage')
  }
}
export const removeState = () => {
  try {
    localStorage.removeItem('state')
  } catch (e) {
    console.log('remove state problem from localStorage')
  }
}
