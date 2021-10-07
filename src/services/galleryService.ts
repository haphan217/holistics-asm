import axios from "axios";
import { API } from "utils/constants";

export const getPhotos = (page: number) => {
  const paramsDTO = {
    query: "sculpture",
    page: page,
  };
  return axios.get(`${API}/search/photos`, {
    headers: {
      Authorization: "Client-ID pV2uzSPqcPOw8KkpUAWMtW2nsFy_nqYUEVvpgUcTma8",
    },
    params: paramsDTO,
  });
};
