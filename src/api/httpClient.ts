import axios from 'axios';

import { attachInterceptors } from './interceptors';
import { APIConstants } from './types/apiConstants';

const httpClient = axios.create({
  baseURL: APIConstants.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

attachInterceptors(httpClient);

export default httpClient;
