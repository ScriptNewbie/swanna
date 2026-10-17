import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://api.swanna.net.pl",
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = () => client.get<T>(this.endpoint).then((response) => response.data);
}

export default ApiClient;
