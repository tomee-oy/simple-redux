export const total = (state = 0, action) => {
  if(action.type === 'CONSUMER_TOTAL') {
    return action.payload
  }
  return state
}