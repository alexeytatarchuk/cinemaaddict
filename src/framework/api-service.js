export default class ApiService {
  #endPoint = null;
  #auth = null;

  constructor(endPoint, auth) {
    this.#endPoint = endPoint;
    this.#auth = auth;
  }

  load = async ({
    url,
    method = 'GET',
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#auth);
    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  };

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  static catchError(err) {
    throw err;
  }
}
