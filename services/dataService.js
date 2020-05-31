import API from '../utils/api'

"use strict";


export default function DataService(state) {

   	async function getGlobalData() {
		let data = await API.post('/api/wp-global-data', {});
		return data;
	}

	async function getPageData(payload) {
	 	let data = await API.post('/api/wp-page-data', payload);
		return data;
	}

	async function getSiteInformation() {
		let data = await API.post('/api/wp-site-information', {});
	   	return data;
	}

	async function getBannerData(payload) {
		let data = await API.post('/api/wp-banners', payload);
	   	return data;
	}

	function getPostData(data) {
	 return {data:'single data'}
	}

   return {
    getGlobalData,
  	getPageData,
  	getBannerData,
  	getSiteInformation
  }

}
