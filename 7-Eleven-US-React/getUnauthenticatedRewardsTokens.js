import { GET_AUTH_TOKEN } from "../constants/apiRoutes";
import { getInstance } from "common/http-client";
import config from "../../../config";

const getUnauthenticatedRewardsTokens = async () => {
  const HttpClient = getInstance(null, true);
  const data = JSON.stringify({
    "client_id": config.rewardsApi.anon_id,
    "client_secret": config.rewardsApi.anon_secret,
    "grant_type": "client_credentials", 
  });
  const options = { headers: { "Content-Type": "application/json" } };
  try {
    const response = await HttpClient.post(GET_AUTH_TOKEN, data, options);
    return response.data;
  }
  catch (error) {
    throw { error: error.response ? error.response.data : error };
  }
};

export default getUnauthenticatedRewardsTokens;