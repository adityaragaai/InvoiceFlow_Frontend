import api from './axios';

export const dashboardApi = {
  getSummary: () => api.get('/dashboard/summary'),
  getTopCustomers: () => api.get('/dashboard/top-customers'),
};
