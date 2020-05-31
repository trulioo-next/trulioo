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

	async function getSiteInformation(payload) {
		let data = await API.post('/api/wp-site-information', payload);
	   	return data;
	}
	
	async function getBannerData() {
		let data = await API.post('/api/wp-banners', {});
	   	return data;
	}

	function getPostData(data) {
	 return {data:'single data'}
	}

   return {
    getGlobalData,
	getPageData,
	getAlertsData,
	getBannerData,
	getSiteInformation
  }

}