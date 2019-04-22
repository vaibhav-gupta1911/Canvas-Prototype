import isEmpty from "../validation/is-empty";

import { GET_STUDENTS, DROP_STUDENT } from "../actions/types";

const initialState = {
  students: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
    case DROP_STUDENT:
      return {
        ...state,
        students: state.students.filter(x => x._id !== action.payload) //action.payload
      };
    default:
      return state;
  }
}
