export default function reducer(state, action) {
  switch (action.type) {
    case 'NEXT_IMG':
      return state === action.payload - 1 ? 0 : state + 1

    case 'PREV_IMG':
      return action.payload.index === 0 ? action.payload.last : state - 1

    case 'JUMP_TO':
      return action.payload

    default:
      return state
  }
}
