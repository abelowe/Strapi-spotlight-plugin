import { useFetchClient } from '@strapi/helper-plugin';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useQuickTasks = () => {
  const { get } = useFetchClient();

  const fetchTasks = async () => {
    try {
      const response = await get('/spotlight/tasks?populate=icon');
      console.log('API Response:', response); 

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('Unexpected API response structure:', response);
        return [];
      }
    } catch (error) {
      throw error; 
    }
  };

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['quickTasks'],
    queryFn: fetchTasks,
  });

  if (error) {
    console.error('Error fetching tasks:', error);
    if (error instanceof AxiosError && error.response && error.response.status === 401) {
      console.error('Unauthorized access - possible invalid token');
    }
  }

  return { tasks: tasks || [], isLoading, error };
};

export default useQuickTasks;