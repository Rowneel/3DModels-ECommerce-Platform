import axios from "axios";
class CartAPI {
  async fetchProduct(productId) {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const cartAPI = new CartAPI();

export default cartAPI;

