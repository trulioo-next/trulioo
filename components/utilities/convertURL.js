export const convertURL = (url) => {
	if (url) {
		const updatedURL = url.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
		return updatedURL;
	}
	return null;
};

export const convertFullURL = (url) => {
	const updatedURL = url.split('/');
	const getLastSegment = updatedURL.pop() || updatedURL.pop();
	return getLastSegment;
};
