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

  async function filterArticleData(page) {
		let data = await API.post('/api/wp-filter', {payload:page});
		return data;
	}

  async function searchTypeData(page) {
    let data = await API.post('/api/wp-search', {payload:page});
    return data;
  }

  async function articleTypesData(page) {
    let data = await API.post('/api/wp-types', {payload:page});
    return data;
  }

  async function filterResoucesData(page) {
		let data = await API.post('/api/wp-resouces-filter', {payload:page});
		return data;
	}

  async function searchResoucesData(page) {
    let data = await API.post('/api/wp-resouces-search', {payload:page});
    return data;
  }

  async function resoucesTypesData(page) {
    let data = await API.post('/api/wp-resouces-types', {payload:page});
    return data;
  }


  async function filterPressData(page) {
		let data = await API.post('/api/wp-press-filter', {payload:page});
		return data;
	}

  async function searchPressData(page) {
    let data = await API.post('/api/wp-press-search', {payload:page});
    return data;
  }

  async function pressTypesData(page) {
    let data = await API.post('/api/wp-press-types', {payload:page});
    return data;
  }

   return {
   	getResourceData,
    getPressReleaseData,
    getArticleData,
    filterArticleData,
    searchTypeData,
    articleTypesData,
    filterResoucesData,
    searchResoucesData,
    resoucesTypesData,
    filterPressData,
    searchPressData,
    pressTypesData,
  }

}
