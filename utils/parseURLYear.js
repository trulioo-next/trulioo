export const parseUrl = () => {
	const currentUrlString = window && window.history && window.location.href;
  const currentlUrl = new URL(currentUrlString);
  const page = currentlUrl.searchParams.get('page');
  const types = currentlUrl.searchParams.get('types');
  const years = currentlUrl.searchParams.get('years');

  return ({
    page: page && parseInt(page, 10) || 1,
    types: types && types.split(',') || [],
    years: years && years.split(',') || [],
  });
};

export const urlHasParams = parsedUrl => {
  const { types, years, page } = !parsedUrl ? parseUrl() : parsedUrl;
  const hasPage = ![ null, undefined, '', 'null', 1, '1' ].includes(page);
  const hasTypes = ![ null, undefined ].includes(types) && types.length > 0;
  const hasYears = ![ null, undefined ].includes(years) && years.length > 0;

  return hasPage || hasTypes || hasYears;
};

export const pushUrl = ({ types, years, page }) => {
  const params = new URLSearchParams({
    ...(types && { types: types }),
    ...(years && { years: years }),
    ...(page && { page: page }),
  });
	window.history.pushState({ types, years, page }, '', `?${ params }`);
};
