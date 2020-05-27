import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_API_URL;

const responseBody = (res) => res.body;

const requests = {
  get: (url) => superagent.get(`${ API_ROOT }${ url }`).then(responseBody),
  getWithCredentials: (url) => superagent.get(`${ API_ROOT }${ url }`).withCredentials().then(responseBody),
};

const Menus = {
  fieldsById: () =>
    requests.get('/wp-json/acf/v3/menus')
};

const Content = {
	dataByPageNumber: number =>
		requests.get(`/wp-json/acf/v3/pages/${ number }`),
  getOptions: options =>
    requests.get(`/wp-json/acf/v3/options/${ options }`)
};

export default {
	Content,
  Menus
};
