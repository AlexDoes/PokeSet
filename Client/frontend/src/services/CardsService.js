const API_BASE_URL = "http://localhost:8080/api/v1";
import axios from "axios";

export class CardService {
  static async getCards(page = 0, size = 320, sortBy = "name") {
    const response = await axios.get(`${API_BASE_URL}/cards`, {
      params: { page, size, sortBy },
    });
    return response.data;
  }

  static async getCard(id) {
    const response = await axios.get(`${API_BASE_URL}/cards/${id}`);
    return response.data;
  }

  static async getCardsByType(type, page = 0, size = 10) {
    const response = await axios.get(`${API_BASE_URL}/cards/type/${type}`, {
      params: { page, size },
    });
    return response.data;
  }
  static async getCardsSimple() {
    const response = await axios.get(`${API_BASE_URL}/simple`);
    return response.data;
  }
}
