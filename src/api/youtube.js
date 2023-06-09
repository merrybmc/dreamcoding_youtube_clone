import axios from 'axios';

export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient.channels({ params: { part: 'snippet', id } }).then((response) => response.data.items[0].snippet.thumbnails.default.url);
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({ params: { part: 'snippet', maxResults: 25, type: 'video', q: keyword } })
      .then((response) => response.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.videoId })));
  }

  async #mostPopular() {
    return this.apiClient.videos({ params: { part: 'snippet', maxResults: 25, chart: 'mostPopular' } }).then((response) => response.data.items);
  }
}
