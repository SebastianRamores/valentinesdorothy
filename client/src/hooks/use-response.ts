import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertResponse } from "@shared/routes";

export function useCreateResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertResponse) => {
      const res = await fetch(api.response.create.path, {
        method: api.response.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit response');
      }
      
      return api.response.create.responses[201].parse(await res.json());
    },
    // We don't strictly need to invalidate anything unless we have an admin stats page
    // but it's good practice
    onSuccess: () => {
      // If we had a stats query, we'd invalidate it here
      // queryClient.invalidateQueries({ queryKey: [api.response.getStats.path] })
    }
  });
}
