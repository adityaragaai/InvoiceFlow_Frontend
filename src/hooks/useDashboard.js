import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard';

export const useSummary = () =>
  useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: dashboardApi.getSummary,
    staleTime: 60_000,
  });

export const useTopCustomers = () =>
  useQuery({
    queryKey: ['top-customers'],
    queryFn: dashboardApi.getTopCustomers,
    staleTime: 60_000,
  });
