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
  public postAPI = async <T>(path: string, value: Omit<T, 'id'>, param: {}) => {
    const response = await this.http.getIntance().post<T>(path, value, param)
    return response.data
  }
  public putAPI = async <T>(path: string, value: T, param: {}) => {
    const response = await this.http.getIntance().put<T>(path, value, param)
    return response.data
  }
  public deleteAPI = async <T>(path: string, param: {}) => {
    const response = await this.http.getIntance().delete<T>(path, param)
    return response.data
  }
  // export const del = async (path, value) => {
  //   try {
  //     const res = await request.del(path, value);
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
const service = new Service(new Http())

export default service
