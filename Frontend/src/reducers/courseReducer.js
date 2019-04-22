import {
  GET_COURSES,
  COURSES_LOADING,
  GET_COURSES_DELETED
} from "../actions/types";

const initialState = {
  courses: null,
  loadin: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COURSES_LOADING:
      return {
        ...state,
        courses: action.payload,
        loadin: true
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loadin: false
      };
    case GET_COURSES_DELETED:
      return {
        ...state,
        courses: state.courses.filter(x => x._id !== action.payload),
        loadin: false
      };
    default:
      return state;
  }
}
