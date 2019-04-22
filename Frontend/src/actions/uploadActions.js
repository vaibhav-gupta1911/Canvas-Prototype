import axios from "axios";

import { GET_FILES, FILE_UPLOADED } from "./types";

export const displayfileupload = obj => dispatch => {
  // dispatch(setProfileLoading());
  const params = {
    _id: obj.id,
    _uid: obj.uid
  };
  axios
    .get("/api/fileupload/viewuploads", { params })
    .then(res =>
      dispatch({
        type: GET_FILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FILES,
        payload: null
      })
    );
};

export const uploadFiles = (formData, config, data) => dispatch => {
  //uploadFiles
  axios
    .post("/api/fileupload/uploadFiles", formData, config, data)
    .then(res =>
      dispatch({
        type: FILE_UPLOADED,
        payload: ""
      })
    ) //res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: FILE_UPLOADED,
        payload: ""
      })
    );
};
