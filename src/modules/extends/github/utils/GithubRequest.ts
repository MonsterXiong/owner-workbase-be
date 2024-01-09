const axios = require("axios");
const BASE_URL = "https://api.github.com";

class GithubRequest {
  [x: string]: any;
  constructor(token) {
    this.token = token;
    this.service = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    });
    this.service.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${this.token}`;
        config.headers["X-GitHub-Api-Version"] = `2022-11-28`;
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    this.service.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error.response && error.response.data) {
          return error.response;
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  get(url, params, headers) {
    return this.service({
      url,
      params,
      method: "get",
      headers,
    });
  }

  post(url, data, headers) {
    return this.service({
      url,
      data,
      method: "post",
      headers,
    });
  }
}

export default GithubRequest;