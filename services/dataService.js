import API from '../utils/api'
const homeData = require('../data/home.json')
 
"use strict";
 

export default function DataService(state) {

   	async function getGlobalData() {
		let data = await API.post('/api/wp-global-data', {});
		return data;
	}

	async function getPageData(payload) {
	 

	 
    
   	console.log('RESONSE ', homeData)
	return homeData;
	}

	function getPostData(data) {
	 return {data:'single data'}
	}

   return {
    getGlobalData,
    getPageData
  }

}