import ApiService from './framework/api-service';

export default class MovieApiService extends ApiService{
  get movies() {
    return this.load({url: 'movies'})
      .then(ApiService.parseResponse);
  }
}
