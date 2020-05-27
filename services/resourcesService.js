import API from '../utils/api'
 
"use strict";
 

export default function ResourcesService(state) {

   	async function getResourceData() {
		let data = await API.post('/api/wp-resources', {});
		return data;
	}

	 

   return {
    getResourceData
  }

}