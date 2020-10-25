import Axios, { AxiosRequestConfig } from 'axios';
// import Config from 'react-native-config';

// import store from '@store';
//
// import loading from '~/store/loading/actions';

const BASE_URL = "http://localhost:8080/api";

const api = Axios.create({
  baseURL: BASE_URL,
  timeout: 3600000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const rawApi = Axios.create({
  baseURL: BASE_URL,
  timeout: 3600000,
  headers: {
    'Content-Type': 'application/json',
  },
});
//
// api.interceptors.request.use((config) => {
//   store.dispatch(loading.showLoading());
//
//   return config;
// }, (error) => {
//   store.dispatch(loading.hideLoading());
//
//   return Promise.reject(error);
// });
//
// api.interceptors.response.use((response) => {
//   store.dispatch(loading.hideLoading());
//
//   return response;
// }, (error) => {
//   store.dispatch(loading.hideLoading());
//
//   return Promise.reject(error);
// });

export default class Api {
  static get<T>(url: string, config?: AxiosRequestConfig) {
    return api.get(url, config);
  }

  static delete<T>(url: string, config?: AxiosRequestConfig) {
    return api.delete(url, config);
  }

  static post<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return api.post(url, data, config);
  }

  static put<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return api.put(url, data, config);
  }

  static patch<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return api.patch(url, data, config);
  }

  static rawGet<T>(url: string, config?: AxiosRequestConfig) {
    return rawApi.get(url, config);
  }

  static setToken(token: string) {
    api.defaults.headers = {
      ...api.defaults.headers,
      Authorization: `Bearer ${token}`,
    };
    rawApi.defaults.headers = {
      ...rawApi.defaults.headers,
      Authorization: `Bearer ${token}`,
    };
  }
}
