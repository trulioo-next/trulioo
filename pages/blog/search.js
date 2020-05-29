import { Search } from '../../components/SearchWithFilters';
// import api from '../../../services/api';
import { connect } from 'react-redux';
import { parseUrl, urlHasParams, pushUrl } from '../../utils/parseURL';

const mapStateToProps = state => {
  return {
    types: state.api.blogs.types,
    topics: state.api.blogs.topics,
    selectedTopics: state.api.blogs.search.topics || [],
    selectedTypes: state.api.blogs.search.types || [],
    page: state.api.blogs.search.page || 1,
    title: 'Blog'
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getTypes: () => {
      api.Articles.types()
      .then((data) => {
        dispatch(
          { type: 'LOAD_BLOGS_TYPES', payload: data }
        );
      });
    },
    getTopics: () => {
      api.Articles.topics()
      .then((data) => {
        dispatch(
          { type: 'LOAD_BLOGS_TOPICS', payload: data }
        );
      });
    },
    search: (types, topics, term, page) => {
      if (types === null) {
        types = [];
      };
      if (topics === null) {
        topics = [];
      };
      if (types != null && types.length < 1 && topics != null && topics.length < 1 && term != null && term.length < 2 ) {
        dispatch({
          type: 'CLEAR_BLOGS_SEARCH'
        });
        pushUrl({ types: null, topics: null, page: 2 });
      } else {
        api.Articles.search(types, topics, 0, term.length > 2 ? term : '')
        .then((data) => {
          const result = data.body;
          const max_page = data.headers;

          dispatch({
            type: 'LOAD_BLOGS_SEARCH',
            payload: { term, types, topics, result, max_page }
          });
          if (page !== 1) {
            dispatch({
              type: 'LOAD_BLOGS_PAGINATION',
              payload: 1
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: 'LOAD_BLOGS_SEARCH_ERROR',
            payload: { term }
          });
        });
        dispatch({
          type: 'LOAD_BLOGS_PAGINATION', payload: 1
        });
        pushUrl({ types, topics, page: 1 });
      }
    },
    clear: () => {
      dispatch({ type: 'CLEAR_BLOGS_SEARCH' });
      pushUrl({ types: null, topics: null, page: 2 });
    }
  };
};

export const SearchBlogs = connect(mapStateToProps, mapDispatchToProps)(Search);
