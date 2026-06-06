import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { invoiceApi } from '../api/invoices';

export const useInvoices = (params) =>
  useQuery({
    queryKey: ['invoices', params],
    queryFn: () => invoiceApi.getAll(params),
    placeholderData: keepPreviousData,
  });

export const useInvoice = (id) =>
  useQuery({
    queryKey: ['invoice', id],
    queryFn: () => invoiceApi.getOne(id),
    enabled: !!id,
  });

export const useCreateInvoice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: invoiceApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] });
      qc.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });
};

export const useUpdateInvoice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => invoiceApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] });
      qc.invalidateQueries({ queryKey: ['invoice'] });
    },
  });
};

export const useDeleteInvoice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: invoiceApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] });
      qc.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });
};
