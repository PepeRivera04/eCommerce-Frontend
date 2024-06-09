import { ENV } from "@/utils";

export class Game {
  async getLastPublished() {
    try {
      const sort = "sort=publishedAt:desc";
      const pagination = "pagination[limit]=1";
      const populate = "populate=*";
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${sort}&${pagination}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getLatestPublished({ limit = 6, platformId = null }) {
    try {
      const filterPlatform =
        platformId && `filters[platform][id][$eq]=${platformId}`;

      const paginationLimit = `pagination[limit]=6`;
      const sort = "sort[0]=publishedAt:desc";
      const populate = "populate=*";

      const urlParams = `${sort}&${paginationLimit}&${filterPlatform}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getGamesByPlatformSlug(slug, page) {
    try {
      const filters = `filters[platforms][slug][$eq]=${slug}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=10`;
      const populate = "populate=*";
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async searchGames(text, page) {
    try {
      const filters = `filters[title][$contains]=${text}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=10`;
      const populate = "populate=*";
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    try {
      const filters = `filters[slug][$eq]=${slug}`;
      const populateGame =
        "populate[0]=wallpaper&populate[1]=cover&populate[2]=screenshots&populate[3]=platforms";
      const populatePlatform = "populate[4]=platforms.icon";
      const populates = `${populateGame}&${populatePlatform}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${filters}&${populates}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getGameById(gameId) {
    try {
      const populate = "populate[0]=cover&populate[1]=platforms";

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}/${gameId}?${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
