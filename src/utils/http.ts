import axios, { AxiosInstance } from 'axios'

class Http {
  private instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000
    })
  }
  public getIntance = (): AxiosInstance => {
    return this.instance
  }
}

class Service {
  private http: Http

  public constructor(http: Http) {
    this.http = http
  }
  public getAPI = async <T>(path: string, param?: {}) => {
    const response = await this.http.getIntance().get<T>(path, param)
    return response.data
  }
}
const service = new Service(new Http())

export default service
