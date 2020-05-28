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

	async function getAlertsData(payload) {
	 	let data = await API.post('/api/wp-alerts-data', payload);
		return data;
	}

	async function getLogo() {
		let data = await API.post('/wp/v2/logo', {});
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
	getAlertsData,
	getLogo,
	getBannerData
  }

}