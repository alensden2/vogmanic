/**
 * API Configuration
 *
 * This module provides a configured Axios instance for making HTTP requests to the VogueManic backend API.
 * It adds an interceptor to attach the access token to the request headers before each request is sent.
 *
 * It uses Axios to simplify the process of making API calls and utilizes the HOSTED_BASE_URL constant for the API endpoint.
 */

import axios from 'axios';
import { HOSTED_BASE_URL } from '../../src/constants';

/**
 * Adds to check if token is present in the local storage
 */
const api = axios.create({
  baseURL: `${HOSTED_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to attach the access token to the request header before each request is sent
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
