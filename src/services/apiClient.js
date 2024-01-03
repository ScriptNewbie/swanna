import axios from "axios";

const client = axios.create({
  baseURL: "https://api.swanna.net.pl",
});

class ApiClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  get = () => client.get(this.endpoint).then((response) => response.data);
}

export default ApiClient;
