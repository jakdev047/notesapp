import { GET_NOTES } from "../actions/types";

const init = {
  notes: [
    {id:1, title: 'Note One', comment: 'This is note one', userId: 'a' },
    {id:2, title: 'Note Two', comment: 'This is note Two', userId: 'b' },
    {id:3, title: 'Note three', comment: 'This is note three', userId: 'a' }
  ]
}

const reducers = (state=init,action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: [...state.notes,action.payload]
      }
  
    default:
      return state;
  }
}

export default reducers;