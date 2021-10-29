import axios from "axios";

export const addUserData = (formData) => {
  return axios.post(`${process.env.REACT_APP_NODE_URL}/add`, formData);
};

export const getUserCount = () => {
  return axios.get(`${process.env.REACT_APP_NODE_URL}/count`);
};

export const getUser = (mobile) => {
  return axios.get(`${process.env.REACT_APP_NODE_URL}/get-user/${mobile}`);
};
