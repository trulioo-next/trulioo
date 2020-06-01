import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ArrowLeft from '../../static/assets/chevron-left.svg';
import ArrowRight from '../../static/assets/chevron-right.svg';

export const Pagination = ({ windowSize: initialWindowSize, setPage, activePage, maxPage }) => {
  const [ pagesWindow, setPagesWindow ] = useState([]);
  const totalPages = maxPage['x-wp-totalpages'] && parseInt(maxPage['x-wp-totalpages'], 10);
  const windowSize = totalPages < initialWindowSize ? totalPages : initialWindowSize;

  const shiftWindow = () => {
    if (activePage <= windowSize) {
      makeWindow(true);
    }
    else if (activePage > windowSize) {
      makeWindow(false);
    }
  };

  useEffect(() => {
    shiftWindow();
  }, [ activePage, maxPage ]); /* eslint-disable-line */

  const makeWindow = isInsideCurrentWindow => {
    const newWindow = [ ...Array(windowSize).keys() ].map(index => {
      const page = isInsideCurrentWindow
        ? index + 1
        : activePage - windowSize + index + 1;
      return ({
        page,
        isActive: activePage === page
      });
    });
    setPagesWindow(newWindow);
  };

  const renderBackLink = () => {
    const page = activePage - 1;
    return activePage !== 1 && (
      <button id={ `page-${ page }` } className="page-arrow page-prev mr-md-4" onClick={ () =>
        {
          setPage(page);
          window.scrollTo(0, document.querySelector('.blog-posts-section').offsetTop - 100);
        } }
        title="Previous Page">
        <ArrowLeft />
      </button>
    );
  };

  const renderNextLink = () => {
    const page = activePage + 1;
    const hasNextPage = totalPages ? page <= totalPages : true;
    return hasNextPage && (
      <button id={ `page-${ page }` } className="page-arrow page-next ml-md-4" onClick={ () => {
          setPage(page);
          window.scrollTo(0, document.querySelector('.blog-posts-section').offsetTop - 100);
        } } title="Next Page">
        <ArrowRight />
      </button>
    );
  };

  return (
    <nav className="blog-pagination px-5 px-md-0 mt-5">
      <ul className="d-flex p-0 m-0 align-items-center justify-content-between justify-content-md-center">
        {pagesWindow.length > 0 && renderBackLink()}
          {
            pagesWindow.map(({ page, link, isActive }) => (
              <li className="p-0 mx-md-3" key={ `page-${ page }` } id={ `page-${ page }` }>
                <button
                  onClick={ () => {
                    setPage(page);
                    window.scrollTo(0, document.querySelector('.blog-posts-section').offsetTop  - 100);
                  } }
                  className={ classnames( 'page-number', { 'text-primary' : isActive } ) }>{page}</button>
              </li>
            ))
          }
        {pagesWindow.length > 0 && renderNextLink()}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  windowSize: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  maxPage: PropTypes.any
};

Pagination.defaultProps = {
  maxPage: {}
};

export default Pagination
