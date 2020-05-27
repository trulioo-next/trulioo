import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = process.env.REACT_APP_API_URL;
const responseBody = res => res.body;
const responseFull = res => res;

const requests = {
	get: url =>
		superagent.get(`${ API_ROOT }${ url }`).then( responseBody ),
	getWithHeaders: url =>
	superagent.get(`${ API_ROOT }${ url }`).then( responseFull ),
	getWithCredentials: url =>
		superagent.get(`${ API_ROOT }${ url }`).withCredentials().then( responseBody )
};

const filterTypesAndTopics = arr => arr.includes('all') ? '' : arr.join(',');

const SiteInformation = {
	logo: () =>
		requests.get('/wp-json/wp/v2/logo'),
	information: () =>
		requests.get('/wp-json')
};

const Menus = {
	bySlug: (slug) =>
		requests.get(`/wp-json/trulioo/menus/${ slug }`)
};

const Content = {
	data: type =>
		requests.get(`/wp-json/wp/v2/${ type }?_embed`),
	dataBySlug: (type, slug) =>
		requests.get(`/wp-json/wp/v2/${ type }?slug=${ slug }`),
	previewDataBySlug: (type, slug, wpnonce) =>
		requests.getWithCredentials(`/wp-json/trulioo/preview?type=${ type }&slug=${ slug }&_wpnonce=${ wpnonce }&_embed`),
	previewDataById: (type, id, wpnonce) =>
		requests.getWithCredentials(`/wp-json/trulioo/preview?type=${ type }&id=${ id }&_wpnonce=${ wpnonce }&status=draft&_embed`),
	pageList: () =>
		requests.get('/wp-json/trulioo/pages/list'),
	postsBasedOnTags:(postType, tagName,numberOfPosts) =>
		requests.get(`/wp-json/trulioo/${ postType }/${ tagName }/${ numberOfPosts }`),
	postsPressRelease:() =>
		requests.get('/wp-json/trulioo/press/featured')
};

const Resources = {
	search: async (types = [], topics = [], page = 1, search = '') =>
		await requests.get(`/wp-json/wp/v2/resources/?_embed&resources_types=${ filterTypesAndTopics(types) }&resources_topics=${ filterTypesAndTopics(topics) }&per_page=9&page=${ page }&orderby=date&order=desc&search=${ search }`),
	postList: (page = 1) =>
		requests.get(`/wp-json/wp/v2/resources/?_embed&per_page=9&page=${ page }`),
	topics: () =>
		requests.get('/wp-json/wp/v2/resources_topics?per_page=100'),
	types: () =>
		requests.get('/wp-json/wp/v2/resources_types?per_page=100')
};

const PressReleases = {
	search: async (types = [], years = [], page = 1, search = '') =>
		await requests.get(`/wp-json/wp/v2/press_releases/?_embed&press_releases_types=${ filterTypesAndTopics(types) }&press_releases_years=${ filterTypesAndTopics(years) }&per_page=9&page=${ page }&order=desc&search=${ search }`),
	postList: (page = 1) =>
		requests.get(`/wp-json/wp/v2/press_releases/?per_page=9&page=${ page }`),
	types: () =>
		requests.get('/wp-json/wp/v2/press_releases_types?per_page=100'),
	years: () =>
		requests.get('/wp-json/wp/v2/press_releases_years?per_page=100')
};

const Articles = {
	search: async (types = [], topics = [], offset = 0, search = '') =>
		await requests.getWithHeaders(`/wp-json/wp/v2/posts/?_embed&articles_types=${ filterTypesAndTopics(types) }&articles_topics=${ filterTypesAndTopics(topics) }&offset=${ offset }&per_page=10&orderby=date&order=desc&search=${ search }`),
	postList: (offset = 0, posts_per_page = 5) =>
		requests.get(`/wp-json/trulioo/posts/?offset=${ offset }&posts_per_page=${ posts_per_page }`),
	topics: () =>
		requests.get('/wp-json/wp/v2/articles_topics?per_page=100'),
	types: () =>
		requests.get('/wp-json/wp/v2/articles_types?per_page=100'),
	postDataById: (id) =>
		requests.get(`/wp-json/trulioo/post/${ id }`),
};

const Slugs = {
	categories: () =>
		requests.get('/wp-json/wp/v2/categories?per_page=100'),
	tags: () =>
		requests.get('/wp-json/wp/v2/tags')
};

const Filter = {
	custom: type =>
		requests.get(`/wp-json/trulioo/terms/${ type }`)
};

export default {
	SiteInformation,
	Menus,
	Content,
	Slugs,
	Articles,
	PressReleases,
	Resources,
	Filter
};
