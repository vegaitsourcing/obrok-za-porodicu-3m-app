import axios from 'axios';
import {BASE_URL} from '../constants/BaseUrl';
import {ResponseModel} from '../models/ResponseModel';

interface IVolunteerActionService {
  getActions(page: number): Promise<ResponseModel>;
}

class VolunteerActionService implements IVolunteerActionService {
  async getActions(page: number): Promise<ResponseModel> {
    try {
      const response = await axios.get(`${BASE_URL}/api/volunteer-actions`);

      return {
        data: response.data,
        code: 200,
      };
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

export default new VolunteerActionService();
