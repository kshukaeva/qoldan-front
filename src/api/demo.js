import axios from 'axios';

const demoAPI = {
  async sayHello() {
    try {
      const response = await axios.get('http://localhost:8100/api/demo');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default demoAPI;
