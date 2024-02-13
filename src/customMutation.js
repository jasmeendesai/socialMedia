

export const useCustomMutation = (queryClient, mutationOptions) => {
    const mutate = async (mutationFn, variables) => {
      try {
        const response = await mutationFn(variables); 
        mutationOptions.onSuccess?.(response.data, variables);
        mutationOptions.onSettled?.(response.data, null, variables);
        queryClient.invalidateQueries(mutationOptions.queryKey);
      } catch (error) {
        mutationOptions.onError?.(error);
        mutationOptions.onSettled?.(undefined, error);
      }
    };
  
    return { mutate };
  }