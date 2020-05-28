import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const BlogContentFilter = ({
  filterList,
  filterOnChange
}) => (
    <Fragment>
      <select onChange={ filterOnChange }>
        { filterList
          && filterList.map((filter, index) =>
          (
            <option
              key={ index }
              value={ filter.slug }
            >
              { filter.name }
            </option>
          )
        )}
      </select>
    </Fragment>
);

BlogContentFilter.propTypes = {
  filterList: PropTypes.array.isRequired,
  filterOnChange: PropTypes.func
};

BlogContentFilter.defaultProps = {
  filterList: []
};
