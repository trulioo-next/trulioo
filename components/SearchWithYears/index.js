import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  UncontrolledCollapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import useScrollDirection from '../../../utilities/useScrollDirection';
import { FlipButton } from '../../layout/FlipButton';

import FilterIcon from '../../../assets/filters.svg';
import ArrowIndicator from '../../../assets/arrow-down.svg';

export const Search = ({
  getYears,
  getTypes,
  years,
  types,
  selectedYears,
  selectedTypes,
  search,
  clear,
  page
}) => {
  const searchTerm = useRef(undefined);
  const [ searchWithAllYears, setSearchWithAllYears ] = useState(false);
  const [ searchWithAllTypes, setSearchWithAllTypes ] = useState(false);

  useEffect(() => {
    if (years.length <= 0) getYears();
    if (types.length <= 0) getTypes();
  }, [ getYears, getTypes, years.length, types.length ]);

  useEffect(() => {
    setSearchWithAllYears(selectedYears.length <= 0);
    setSearchWithAllTypes(selectedTypes.length <= 0);
  }, [ selectedYears, selectedTypes ]);

  const doClear = () => {
    searchTerm.current.value = '';
    clear();
  };

  const onSearchTermChange = (event) => {
    const changedSearchTerm = event.target.value;
    search(selectedTypes, selectedYears, changedSearchTerm, page);
  };

  const toggleOption = (selected, id) => {
    let result = [ ...selected ];
    if (result.includes(id)) {
      result = result.filter(filterOptionId => filterOptionId !== id);
    } else {
      result.push(id);
    }
    return result;
  };

  const renderSelect = (list, selected, label) => {
    const isAllOptionsChecked = label === 'Types' ? searchWithAllTypes :  searchWithAllYears;
    const allOptionOnChange = event => {
      if (!isAllOptionsChecked) {
        search(
          label === 'Types' ? null : selectedTypes,
          label === 'Years' ? null : selectedYears,
          searchTerm.current.value,
          page
        );
      }
    };
    const optionOnChange = event => {
      const newSelected = toggleOption(selected, event.target.value);
      const newSelectedTypes = label === 'Types' ? newSelected : selectedTypes;
      const newSelectedYears = label === 'Years' ? newSelected : selectedYears;
      search(
        newSelectedTypes,
        newSelectedYears,
        searchTerm.current.value,
        page
      );
    };

    return (
      <UncontrolledDropdown direction="down" className="filter-dropdown">
        <DropdownToggle tag="button" className="search-filter-dropdown-toggler">
          <span className="d-inline-flex align-items-center">
            <FilterIcon className="search-filter-dropdown-icon filter-icon" />
            Filter by {label}
          </span>
          <ArrowIndicator className="search-filter-dropdown-icon arrow-icon"/>
        </DropdownToggle>
        <DropdownMenu flip={ false }>
          <div className="dropdown-item d-flex align-items-center">
            <label htmlFor={ `clear-${ label.toLowerCase() }` } className="m-0">
              <input
                id={ `clear-${ label.toLowerCase() }` }
                className="mr-2"
                type="checkbox"
                name={ label.toLowerCase() }
                value={ 'all' }
                checked={ isAllOptionsChecked }
                onChange={ allOptionOnChange }
              />
              All { label }
            </label>
          </div>
          { list.map(option => (
              <div className="dropdown-item d-flex align-items-center" key={ '' + option.id }>
                <label htmlFor={ '' + option.id } className="m-0">
                  <input
                    id={ '' + option.id }
                    checked={ selected.includes('' + option.id) }
                    className="mr-2"
                    type="checkbox"
                    name={ label.toLowerCase() }
                    value={ option.id }
                    onChange={ optionOnChange }
                  />
                  { option.name }
                </label>
              </div>
            ))
          }
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const scrollDirection = useScrollDirection();
  const [ navTop, setNavTop ] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const siteNav = document.getElementById('site-header');

    if (siteNav) {
      const navBarHeight = siteNav.offsetHeight;
      const onPageNavOffset = ref.current.offsetTop;
      const windowScroller = window.scrollY;

      if (scrollDirection.isUp) {
        siteNav.style.transform = `translateY(${ -navTop }px)`;
        siteNav.classList.add('restick');
      } else if (onPageNavOffset - navBarHeight < windowScroller) {
        setNavTop(onPageNavOffset - navBarHeight - windowScroller);
        siteNav.style.top = navTop;
        siteNav.style.transform = '';
        siteNav.classList.remove('restick');
      }

      const updateNav = () => {
        siteNav.style.top = navTop + 'px';
      };

      window.addEventListener('scroll', updateNav);

      return () => window.removeEventListener('scroll', updateNav);
    }
  }, [ ref, scrollDirection, navTop ]);

  return (
    <div ref={ ref } className="search-filter-bar bg-primary text-white sticky-top"
      onMouseEnter={ () => {
        const customCursor = document.querySelector('.custom-cursor');

        if (customCursor)
          customCursor.classList.add('white');
      } }
      onMouseLeave={ () => {
        const customCursor = document.querySelector('.custom-cursor');

        if (customCursor)
          customCursor.classList.remove('white');
      } }
    >
      <Container className="py-4 p-md-4 py-lmd-0">
      <Row className="align-items-center justify-content-between py-md-2 py-lmd-0">
        <Col className="col w-100 col-lmd-4 col-xl-5 py-2 pl-5 pl-md-4 py-md-0">
          <input className="form-control" ref={ searchTerm } placeholder="Search News" onChange={ onSearchTermChange } />
        </Col>
        <Col xs="auto" className="d-lmd-none pl-0 pr-5">
          <button id="filter-toggler" className="search-filter-collapse-toggler">
            <FilterIcon />
          </button>
        </Col>
        <Col xs="12" className="col-lmd-auto filter-column px-0 px-md-4">
          <UncontrolledCollapse toggler="filter-toggler" className="d-lmd-block">
            <div className="d-md-flex align-items-center align-items-lmd-stretch justify-content-center pt-4 pt-lmd-0">
              {renderSelect(years, selectedYears, 'Years')}
              {renderSelect(types, selectedTypes, 'Types')}
              <FlipButton
                className="d-block align-self-center clear-filter-button ml-md-4"
                size="sm"
                color="light"
                onClick={ doClear }
              >CLEAR</FlipButton>
            </div>
          </UncontrolledCollapse>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  getYears: PropTypes.func.isRequired,
  getTypes: PropTypes.func.isRequired,
  years: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  selectedYears: PropTypes.array.isRequired,
  selectedTypes: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
