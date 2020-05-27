import API from '../utils/api'
 
"use strict";
 

export default function ResourcesService(state) {

   	async function getResourceData(page) {
		let data = await API.post('/api/wp-resources', {payload:page});
		return data;
	}
	
	async function getPressReleaseData(page) {
		let data = await API.post('/api/wp-press-release', {payload:page});
		return data;
	}

	async function getArticleData(page) {
		let data = await API.post('/api/wp-articles', {payload:page});
		return data;
	}

   return {
   	getResourceData,
    getPressReleaseData,
    getArticleData
  }

}