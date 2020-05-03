import API from '../utils/api'
 
"use strict";
 

export default function SearchSiteService(state) {

   	async function searchSite(payload) {
		let data = await API.post('/api/wp-search-site', payload);
		return data;
	}


	return {
    	searchSite
	}

}