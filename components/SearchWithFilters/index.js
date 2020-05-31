import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {  reqFilterArticlesAction, reqSearchArticlesAction } from '@/stores/articles/actions';
import { articlesTypesSelector, articlesTopicsSelector } from '@/stores/articles/selectors';

import {
  Container,
  Row,
  Col,
  UncontrolledCollapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import useScrollDirection from '../../utils/useScrollDirection';
import { FlipButton } from '../../components/FlipButton';
import FilterIcon from '../../static/assets/filters.svg';
import ArrowIndicator from '../../static/assets/arrow-down.svg';

export const Search =  (props) => {

  const dispatch = useDispatch();
  const searchTerm = useRef(undefined);
  const [ searchWithAllTopics, setSearchWithAllTopics ] = useState(false);
  const [ searchWithAllTypes, setSearchWithAllTypes ] = useState(false);
  const topics_new = useSelector( (state) => articlesTopicsSelector(state) )
  const types_new = useSelector( (state) => articlesTypesSelector(state) )
  const [ removeFeatured, setRemoveFeatured ] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedOption, setSelectedOption] = useState('')


  const doClear = () => {
    searchTerm.current.value = '';
    setSearchWithAllTopics(true)
    setSearchWithAllTypes(true)
    props.callBack(false);
  };

  // Render a select object with event
  //
  const renderSelect = (list, selected, label) => {
    const isAllOptionsChecked = label === 'Types' ? searchWithAllTypes :  searchWithAllTopics;
    const allOptionOnChange = event => {
      console.log('isAllOptionsChecked', isAllOptionsChecked )
      if (!isAllOptionsChecked) {
        setSearchWithAllTypes(true)
      }
    };


    const optionOnChange = event => {

      console.log('DESLECTED ',  isAllOptionsChecked )
      props.callBack(true);

      if(label === 'Types') {
        setSelectedTopic(event.target.value)
        setSearchWithAllTypes(false)
        dispatch(reqFilterArticlesAction({ topic_id: selectedOption, type_id: event.target.value , offset:0, posts_per_page: 5 }));

      } else {
        setSelectedOption(event.target.value)
        setSearchWithAllTypes(false)
        dispatch(reqFilterArticlesAction({ topic_id: event.target.value, type_id: selectedTopic, offset:0, posts_per_page: 5 }));
      }

    };

    return (
      <UncontrolledDropdown direction="down" className="filter-dropdown">
        <DropdownToggle tag="button" className="search-filter-dropdown-toggler">
          <span className="d-inline-flex align-items-center">
            <FilterIcon className="search-filter-dropdown-icon filter-icon" />
            Filter by { label }
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
          {
            list.map(option => (
              <div className="dropdown-item d-flex align-items-center" key={ '' + option.id }>
                <label htmlFor={ '' + option.id } className="m-0">
                  <input
                    id={ '' + option.id }

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
  const [ typing, setTyping ] = useState(false);
  const [ typingTimeout, setTypingTimeout ] = useState(0);
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

  const searchPosts = event => {

    setTyping(true)
    if (typingTimeout > 0) {
       clearTimeout(typingTimeout);
    }
    const TIMER = setTimeout(function () {
            setTyping(false)
            props.callBack(true);
            // TRIGGER SEARCH HERE
            dispatch(reqSearchArticlesAction({ post_type:'articles', search:searchTerm.current.value, topic_id: '', type_id: '', offset:0, posts_per_page: 5 }));
    }, 1000)

    setTypingTimeout(TIMER)

    //  reqSearchArticlesAction
    // dispatch(reqSearchArticlesAction({ topic_id: selectedOption, type_id: event.target.value , offset:0, posts_per_page: 5 }));
  }

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
          <input className="form-control" ref={ searchTerm } placeholder={ `Search` }  onChange={ (e) => searchPosts(e) } />
        </Col>
        <Col xs="auto" className="d-lmd-none pl-0 pr-5">
          <button id="filter-toggler" className="search-filter-collapse-toggler">
            <FilterIcon />
          </button>
        </Col>
        <Col xs="12" className="col-lmd-auto filter-column px-0 px-md-4">
          <UncontrolledCollapse toggler="filter-toggler" className="d-lmd-block">
            <div className="d-md-flex align-items-center align-items-lmd-stretch justify-content-center pt-4 pt-lmd-0">
              {topics_new && renderSelect(topics_new, '', 'Topics')}
              {types_new && renderSelect(types_new, '', 'Types')}
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
