import axios from "axios";

const HOST = "http://localhost:4000/";
const axiosDefaultInstance = axios.create({
  baseURL: `${HOST}`,
});

export const metroApi = {
  // insert upload File DB
  insertRequest: data => {
    axiosDefaultInstance({
      method: "post",
      url: "/insert",
      data: data,
    });
  },

  // show list
  showListRequest: () => {
    return axiosDefaultInstance({
      method: "get",
      url: "/list",
    });
  },

  // show exam1
  showExam1Request: () => {
    return axiosDefaultInstance({
      method: "get",
      url: "/exam1",
    });
  },

  // show exam2
  showExam2Request: () => {
    return axiosDefaultInstance({
      method: "get",
      url: "/exam2",
    });
  },

  // show exam3
  showExam3Request: () => {
    return axiosDefaultInstance({
      method: "get",
      url: "/exam3",
    });
  },
};
