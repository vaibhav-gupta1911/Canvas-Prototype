import isEmpty from "../validation/is-empty";

import { GET_ASSIGNMENT } from "../actions/types";

const initialState = {
  assignments: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ASSIGNMENT:
      return {
        ...state,
        assignments: action.payload
      };
    default:
      return state;
  }
}
