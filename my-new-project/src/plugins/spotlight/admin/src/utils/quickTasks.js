// import { useFetchClient } from '@strapi/helper-plugin';
// import { useQuery } from '@tanstack/react-query';
// import { AxiosError } from 'axios';

// const useQuickTasks = () => {
//   const { get } = useFetchClient();

//   // Ensure environment variables are being accessed
//   console.log('API_KEY:', process.env.API_KEY);

//   const fetchTasks = async () => {
//     try {
//       // Use relative URL for the plugin API
//       const response = await get('/spotlight/quick-tasks', {
//         headers: {
//           Authorization: `Bearer ${process.env.API_KEY}`,
//         },
//       });
//       return response.data.data;
//     } catch (error) {
//       // Handle errors here if necessary
//       throw error; // Re-throw error to be caught by react-query
//     }
//   };

//   const { data: tasks, isLoading, error } = useQuery({
//     queryKey: ['quickTasks'],
//     queryFn: fetchTasks,
//   });

//   if (error) {
//     console.error('Error fetching tasks:', error);
//     if (error instanceof AxiosError && error.response && error.response.status === 401) {
//       console.error('Unauthorized access - possible invalid token');
//     }
//   }

//   return { tasks, isLoading, error };
// };

// export default useQuickTasks;