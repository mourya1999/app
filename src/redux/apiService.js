import axios from 'axios';

export const baseUrl = 'https://uat.hindustantruckers.com/api/';

const apiService = async ({
  endpoint,
  method = 'GET',
  data = null,
  headers = {},
  token = null, // Token can be passed as an argument
}) => {
  try {
    const response = await axios({
      url: `${baseUrl}${endpoint}`,
      method: method.toUpperCase(),
      data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())
        ? data
        : null,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined, // Use the token passed as an argument
        ...headers,
      },
      timeout: 10000, // 10 seconds timeout
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error(
      `API call error: ${method.toUpperCase()} ${endpoint}`,
      error.response?.data || error.message
    );

    throw {
      message: error.response?.data?.message || error.message || 'Unknown error',
      status: error.response?.status || 500,
      details: error.response?.data || null,
    };
  }
};

export default apiService;