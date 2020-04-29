import API from '../utils/api'
 
"use strict";
 

export default function NewsroomService(state) {

   	async function getNewsroomData(payload) {
		let data = await API.post('/api/wp-newsroom-data', payload);
		return data;
	}

   return {
    getNewsroomData
  }

}