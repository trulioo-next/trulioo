import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import useScrollDirection from '../../../utilities/useScrollDirection';

const mapStateToProps = state => {
  return { components: state.api.components.content };
};

export const OnPageNavList = ({ components }) => {
  const scrollDirection = useScrollDirection();
  const [ navTop, setNavTop ] = useState(0);
  const ref = useRef();

  const jumpTo = (target, event) => {
    event.preventDefault();
    const handleScroll = null;
    const targetTop = document.querySelector(target).offsetTop,
    onPageNavHeight = document.querySelector('.on-page-nav').offsetHeight;
    window.scroll({ top: targetTop - onPageNavHeight , behavior: 'smooth' });
    window.addEventListener('scroll', handleScroll, { passive: true });
  };

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

  const componentSections = components && components.map((menu, index) => {
    if (
      menu.acf_fc_layout === 'on_page_section_block' ||
      menu.acf_fc_layout === 'meet_the_product_block'
    ) {
      return (
        <li key={ index } className="on-page-nav-item d-block">
          <a className="d-inline-block text-center" href={ '#'+ menu.anchor } onClick={ (event) => jumpTo(`#${ menu.anchor }`, event) }>
            { menu.icon && (
              <img
                className="d-inline-block on-page-nav-item-icon"
                src={ menu.icon.url }
                width={ menu.icon.width }
                height={ menu.icon.height }
                alt={ menu.icon.alt }
              />
             ) }
            <span className="d-block on-page-nav-item-label">
              { menu.nav_title ? menu.nav_title
                : (new DOMParser).parseFromString(menu.title, 'text/html').documentElement.textContent }
            </span>
          </a>
        </li>
      );
    }
  });

  return (
    <nav ref={ ref } className='on-page-nav sticky-top'
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
      <Container fluid className="px-0 d-flex justify-content-center">
        <ul className="on-page-nav-list d-flex px-0 align-items-center">
          { componentSections }
        </ul>
      </Container>
    </nav>
  );
};

OnPageNavList.propTypes = {
  components: PropTypes.array.isRequired,
};

OnPageNavList.defaultProps = {
  components: []
};

export const OnPageNav = connect(mapStateToProps)(OnPageNavList);
