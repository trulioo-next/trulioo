import axios from "axios";

import appConfig from "../../../config";
import isServer from "../util/isServer";
import getTimezoneOffset from "../util/getTimezoneOffset";
import getFraudTripID from "../util/getFraudTripID";

/**
 * Factory for creating Axios instances with custom settings
 * for Loyalty API.
 * 
 * @param {string} bearer token 
 * @param {boolean} fraudHeaders a boolean to specify whether fraud headers 
 * should be set
 * 
 * @returns an instance of Axios client configured suitable for use with Loyalty API 
 */
export const getInstance = (token, fraudHeaders) => {

  const {
    rewardsApi: {
      url: baseURL,
      apiVersion,
      platform
    },
    userAgent
  } = appConfig;

  const config = { baseURL };

  // initialize headers object
  config.headers = {};

  // add custom user-agent string to all server-side calls
  if (isServer()) {
    config.headers["User-Agent"] = userAgent;
  }

  // add bearer token if specified
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  /*
   * build required fraud headers
   * only required in browser environment
   */
  if (!isServer() && fraudHeaders) {    
    const timeZoneOffset = getTimezoneOffset();
    config.headers["X-SEI-TZ"] = timeZoneOffset;
    config.headers["X-SEI-VERSION"] = apiVersion;
    config.headers["X-SEI-PLATFORM"] = platform;
    config.headers["X-SEI-TRIP-ID"] = getFraudTripID(
      timeZoneOffset, 
      apiVersion, 
      platform, 
      navigator.userAgent
    );
  }

  return new HttpClient(axios.create(config));
};

/**
 * An HTTP client implemented with Axios
 * and configured for usage with the Loyalty API.
 *
 * @class HttpClient
 */
class HttpClient {
  /**
   * Creates an instance of HttpClient.
   * 
   * @constructor
   * @param {object} client - an instance of Axios
   */
  constructor(client) {
    this.client = client;
  }
  async get(url, config) {
    return await this.client.get(url, config);
  }
  async post(url, data, config) {
    return await this.client.post(url, data, config);
  }
  async put(url, data, config) {
    return await this.client.put(url, data, config);
  }
  async patch(url, data, config) {
    return await this.client.patch(url, data, config);
  }
  async delete(url, config) {
    return await this.client.delete(url, config);
  }
  async options(url, config) {
    return await this.client.options(url, config);
  }
}