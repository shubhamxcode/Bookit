import axios from 'axios';
import type { Experience, BookingRequest, BookingResponse, PromoValidation } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const experienceService = {
  getAllExperiences: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return response.data;
  },

  getExperienceById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },
};

export const bookingService = {
  createBooking: async (bookingData: BookingRequest): Promise<BookingResponse> => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  validatePromoCode: async (code: string, amount: number): Promise<PromoValidation> => {
    const response = await api.post('/promo/validate', { code, amount });
    return response.data;
  },
};

export default api;

