import { AxiosInstance } from "axios";
import httpService, { HttpService } from "./httpService";

class ApiService {
  api: HttpService;
  apiClient: AxiosInstance;

  constructor() {
    this.api = httpService;
    this.apiClient = this.api.client;
  }
}

export default ApiService;
