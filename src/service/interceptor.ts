import Store from "store";
import axios from "axios";
import { toast } from "react-toastify";

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "api-version": "1.0",
  },
});

// INTERCEPTOR REQUEST
instance.interceptors.request.use(
  async (config: any) => {
    const state: any = Store.getState();
    const unAuthenticatedUrls = ["auth/login"];
    if (unAuthenticatedUrls.indexOf(config.url) === -1) {
      config.headers["Authorization"] = "Bearer " + state.token;
    } else {
      config.headers["Authorization"] = undefined;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return instance(originalRequest);
            })
            .catch((err) => {
              return err;
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;
        return new Promise(function (resolve, reject) {
          const state: any = Store.getState();
          axios
            .get(
              `${process.env.NEXT_PUBLIC_API_URL}/refresh/token/?token=${state.refreshToken}`,
              {}
            )
            .then(({ data }) => {
              const state: any = Store.getState();
              state.setToken(data);
              instance.defaults.headers.common["Authorization"] =
                "Bearer " + data.auth_token;
              originalRequest.headers["Authorization"] =
                "Bearer " + data.auth_token;
              processQueue(null, data.auth_token);
              resolve(instance(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      } else if (
        error.response.status === 500 &&
        (error.response.data.message ===
          "Token Signature could not be verified." ||
          error.response.data.message === "The token has been blacklisted")
      ) {
        // window.location.replace('/login');
        const state: any = Store.getState();
        state.setToken(null);
        toast.error("Session expired. Please login again.");
      }
    } else {
      toast.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
