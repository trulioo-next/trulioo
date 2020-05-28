import { Pagination } from '../../components/Pagination';
import { connect } from 'react-redux';
import { pushUrl } from '../../utils/parseURL';

const mapStateToProps = state => {
  return {
    activePage: state.api.blogs.page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPage: (activePage) => {
      dispatch({
        type: 'LOAD_BLOGS_PAGINATION', payload: activePage
      });
      pushUrl({ page: activePage });
    }
  };
};

export const BlogsPagination = connect(mapStateToProps, mapDispatchToProps)(Pagination);
