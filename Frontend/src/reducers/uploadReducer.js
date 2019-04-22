import isEmpty from "../validation/is-empty";

import { GET_FILES } from "../actions/types";

const initialState = {
  notes: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        notes: action.payload
      };
    default:
      return state;
  }
}
