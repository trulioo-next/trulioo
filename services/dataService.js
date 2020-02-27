import API from '../utils/api'
 
"use strict";
 

export default function DataService(state) {

   	async function getGlobalData() {
		let data = await API.post('/api/wp-data', {});

		return data;
	}

	function getPageData(data) {
	 return {data:'single data'}
	}

	function getPostData(data) {
	 return {data:'single data'}
	}

   return {
    getGlobalData,
  }

}