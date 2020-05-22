import { isNil } from 'lodash';

export const parseUrl = () => {
	const currentUrlString = window && window.history && window.location.href;
  const currentlUrl = new URL(currentUrlString);
  const page = currentlUrl.searchParams.get('page');
  const types = currentlUrl.searchParams.get('types');
  const topics = currentlUrl.searchParams.get('topics');

  return ({
    page: page && parseInt(page, 10) || 1,
    types: types && types.split(',') || [],
    topics: topics && topics.split(',') || [],
  });
};

export const urlHasParams = parsedUrl => {
  const { types, topics, page } = !parsedUrl ? parseUrl() : parsedUrl;
  const hasPage = ![ null, undefined, '', 'null', 1, '1' ].includes(page);
  const hasTypes = ![ null, undefined ].includes(types) && types.length > 0;
  const hasTopics = ![ null, undefined ].includes(topics) && topics.length > 0;

  return hasPage || hasTypes || hasTopics;
};

export const pushUrl = ({ types, topics, page }) => {
  const params = new URLSearchParams({
    ...(types && { types: types }),
    ...(topics && { topics: topics }),
    ...(page && { page: page }),
  });

	window.history.pushState({ types, topics, page }, '', `?${ params }`);
};
