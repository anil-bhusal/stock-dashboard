import axios from 'axios';
import { decryptData } from './decrypt';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a response interceptor to decrypt the response data
axiosInstance.interceptors.response.use(
  (response) => {
    // Decrypt the response data if it contains 'encryptedData'
    // debugger
    if (response.data && response.data.encryptedData) {
      const decryptedData = decryptData(response.data.encryptedData);
      // console.log('Decrypted data:  --------------------------->', decryptedData);
      response.data = decryptedData; // Replace the original data with the decrypted data
    }
    return response;
  },
  (error) => {
    return Promise.reject(error); // Reject the error if any
  }
);

export default axiosInstance;
