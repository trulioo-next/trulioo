// Utility functions


export default class Util {

	/**
	* Normalize unicode normal form (NFD)
	*/
	static normalizeStringToNFD(str) {
		if((typeof str === 'string' || str instanceof String) && str.length <= 255 ) {
			return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		} else {
			return str
		}
	}

	/**
	* Normalize object content to unicode normal form (NFD) - shallow normilization - 1 level
	*/
	static normalizeObjectToNFD(obj) {
		if((typeof obj === 'object' || obj instanceof Object) && Object.keys(obj).length <= 64 ) {
			for (let [key, value] of Object.entries(obj)) {
				obj[key] = this.normalizeStringToNFD(value)
			}
			return obj
		} else {
			return obj
		}
	}


	/**
	* Weak ip validation
	*/
	static validateIP(ip) {
		if(ip === '::1' ) return true
		if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
			return (true)
		}
		return (false)
	}


	/**
	* Weak ip validation
	*/
	static getWindowQuery() {
		let query = window.location;
		return query;
	}


}
