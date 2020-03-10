import API from '../utils/api'
 
"use strict";
 

export default function NutritionalService(state) {

   	async function getNutritionalData() {
		let data = await API.post('/api/wp-nutritional-data', {});
		return data;
	}

   return {
    getNutritionalData
  }

}