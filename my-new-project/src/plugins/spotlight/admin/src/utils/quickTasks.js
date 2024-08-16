import { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';

const useQuickTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { get } = useFetchClient();
  
  // Ensure environment variables are being accessed
  console.log('API_URL:', process.env.API_URL);
  console.log('API_KEY:', process.env.API_KEY);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(`Fetching tasks from: ${process.env.API_URL}/quick-tasks`);
        const response = await get(`${process.env.API_URL}/quick-tasks`, {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        });
        console.log('Response:', response);
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access - possible invalid token');
        }
      }
    };

    fetchTasks();
  }, [get]);

  return tasks;
};

export default useQuickTasks;