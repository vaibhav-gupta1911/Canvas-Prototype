import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import courseReducer from "./courseReducer";
import postReducer from "./postReducer";
import studentReducer from "./studentReducer";
import uploadReducer from "./uploadReducer";
import assignmentReducer from "./assignmentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  courses: courseReducer,
  post: postReducer,
  students: studentReducer,
  notes: uploadReducer,
  assignments: assignmentReducer
});
