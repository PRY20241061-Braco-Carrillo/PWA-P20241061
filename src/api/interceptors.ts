import { AxiosInstance } from 'axios';

export const attachInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config) => {
      
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('Request:', config);
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      
      const { config, response } = error;
      if (response && response.status === 500 && !config.__isRetryRequest) {
        config.__isRetryRequest = true;
        return client(config);
      }
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      
      console.log('Response:', response);
      return response;
    },
    (error) => Promise.reject(error)
  );
};
