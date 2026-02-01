import axios from 'axios';
import { handleError } from '@/utils/errorHandler';
export const api = axios.create({
  baseURL: 'https://node-reply-letter.onrender.com',
  withCredentials: true,
});

export const sendFeedback = async (data) => {
  try {
    const { data: res } = await api.post('/api/feedback', data);
    return res;
  } catch (error) {
    throw handleError(error);
  }
};

export const sendReviews = async (data) => {
  try {
    const { data: res } = await api.post('/api/reviews', data);
    return res;
  } catch (error) {
    throw handleError(error);
  }
};

export const GetReviews = async () => {
  try {
    const { data: res } = await api.get('/api/reviews');
    return res;
  } catch (error) {
    throw handleError(error);
  }
};
