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
	getAlertsData,
<<<<<<< HEAD
	getLogo,
	getBannerData
=======
	getBannerData,
	getSiteInformation
>>>>>>> 053ee7f72c0835fc44362d6ae99fd1b05a2196cc
  }

}