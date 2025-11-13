import { apiClient } from '@/lib/api';

// API for hygiene test operations using server backend
export const hygieneTestApi = {
  // Get all hygiene tests
  getAll: async () => {
    const response = await apiClient.getHygieneTests();
    return response.hygieneTests;
  },

  // Submit a new hygiene test
  submit: async (data: {
    farmType: string;
    answers: number[];
    score: number;
  }) => {
    const response = await apiClient.submitHygieneTest(data);
    return response.test;
  },

  // Get a specific hygiene test
  getById: async (id: string) => {
    const response = await apiClient.getHygieneTest(id);
    return response.test;
  },

  // Delete a hygiene test
  delete: async (id: string) => {
    await apiClient.deleteHygieneTest(id);
  },
};
