import axios from "axios";
import Vue from "vue";
import { getToken } from "@/helpers/access-token";

const URL = "http://45.12.239.156:8081/api";

const requireService = require.context("./service", false, /.service.js$/),
  instance = axios.create({
    baseURL: URL,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Authorization: getToken(),
    },
  });

export const intercept = (fn) => fn(instance.interceptors);

intercept(({ request, response }) => {
  request.use((config) => {
    return config;
  });

  response.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );
});

class Api {
  constructor() {
    this.instance = instance;

    // Register local services
    requireService
      .keys()
      .forEach((filename) => requireService(filename).default(this));
  }

  install() {
    Vue.prototype.$api = this;
  }
}

export default new Api();
