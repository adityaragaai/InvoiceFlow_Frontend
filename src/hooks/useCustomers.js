import { useQuery } from '@tanstack/react-query';
import { customerApi } from '../api/customers';

export const useCustomers = (params) =>
  useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerApi.getAll(params),
    staleTime: 60_000,
  });

export const useCustomer = (id) =>
  useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerApi.getOne(id),
    enabled: !!id,
  });
