import axios from 'axios';

const API_KEY = 'pub_940e237361724a4eb6eb8cd343783868';
const BASE_URL = 'https://newsdata.io/api/1/news';

// Create axios instance with default config
const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const newsService = {
  // Get latest Indian news
  getLatestIndianNews: async () => {
    try {
      const response = await newsApi.get('', {
        params: {
          country: 'in',
          language: 'en',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching latest Indian news:', error);
      throw error;
    }
  },

  // Search news by state
  getNewsByState: async (stateName) => {
    try {
      const response = await newsApi.get('', {
        params: {
          q: stateName,
          country: 'in',
          language: 'en',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching news for state ${stateName}:`, error);
      throw error;
    }
  },

  // Search news by keyword
  searchNews: async (keyword) => {
    try {
      const response = await newsApi.get('', {
        params: {
          q: keyword,
          country: 'in',
          language: 'en',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching news for keyword ${keyword}:`, error);
      throw error;
    }
  },

  // Get news by category
  getNewsByCategory: async (category) => {
    try {
      const response = await newsApi.get('', {
        params: {
          category: category.toLowerCase(),
          country: 'in',
          language: 'en',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching news for category ${category}:`, error);
      throw error;
    }
  },
};