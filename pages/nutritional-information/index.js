import React, { useEffect, useState } from 'react';
import Error from 'next/error';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import camelcase from 'camelcase';

import Layout from '@/containers/Layout';
import Header from '@/components/Header';
import COLUMNS from '@/data/columns';
import { useTable } from 'react-table';

import Hero from '@/components/Hero';
import SearchIcon from '@/static/images/search.svg';
import ChevronIcon from '@/static/images/caret-down.svg';
import CloseIcon from '@/static/images/close.svg';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';

import { reqPageDataAction } from '@/stores/page/actions';
import { pageDataSelector } from '@/stores/page/selectors';

import SectionMaker from '@/components/SectionMaker';

import './Nutritionals.scss';

import { reqNutritionalsAction } from '@/stores/nutritionals/actions';

import {
  nutritionalsSelector,
  nutritionalByTaxonomySelector,
  taxonomiesSelector
} from '@/stores/nutritionals/selectors';

function TableRow({ row }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={classNames('Accordion__item', { '-opened': opened })}>
      <Accordion.Toggle
        className="Accordion__header d-md-none"
        eventKey={row.id}
      >
        <span className="Accordion__heading">{row.cells[0].value}</span>
        <ChevronIcon className="Accordion__toggle" />
      </Accordion.Toggle>
      <Accordion.Collapse
        eventKey={row.id}
        className="Accordion__collapse d-md-block"
        onEntered={() => setOpened(true)}
        onExited={() => setOpened(false)}
      >
        <div {...row.getRowProps()} className="tr">
          {row.cells.map((cell, i) => {
            return (
              <div
                {...cell.getCellProps()}
                className={`td -${camelcase(cell.column.Header)}`}
                key={`row-${row.id}-${cell.column.id}`}
              >
                <span className="Nutritionals__cellLabel">
                  {cell.column.Header}
                </span>
                <span className="Nutritionals__cellValue">
                  {cell.render('Cell')}
                </span>
              </div>
            );
          })}
        </div>
      </Accordion.Collapse>
    </div>
  );
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Container fluid className="px-0">
      <div {...getTableProps()} className="Nutritionals__table">
        <div className="thead">
          {headerGroups.map((headerGroup, i) => {
            return (
              <div
                {...headerGroup.getHeaderGroupProps()}
                className="tr"
                key={`header-group-${i}`}
              >
                {headerGroup.headers.map(column => (
                  <div
                    {...column.getHeaderProps()}
                    className={`th -${camelcase(column.Header)}`}
                    key={column.id}
                  >
                    {column.render('Header')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <Accordion {...getTableBodyProps()} className="Accordion">
          {rows.map((row, i) => {
            prepareRow(row);
            return <TableRow row={row} key={row.id} />;
          })}
        </Accordion>
      </div>
    </Container>
  );
}

 

function Page() {
// const Page = props => {
  const columns = COLUMNS;


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: 'nutritional-information' }));
  }, []);

  const pageData = useSelector(state => pageDataSelector(state));
  const taxonomies = useSelector(state => taxonomiesSelector(state));

  // console.log('PROPS TO LOAD ---> >>>>  ', taxonomies )
  let taxObjects = '';
  if(taxonomies) {
    taxObjects = taxonomies.map((item, key) =>
      <option key={item.term_id} value={item.slug}>{item.name}</option>
    );
  }

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(reqNutritionalsAction({}));
  // }, []);

  let [taxonomySelected, setTaxonomySelected] = useState(
    'crispy-classic-chicken',
  );
  let products = useSelector(nutritionalByTaxonomySelector());
  let productsSelected = filterProducts('crispy-classic-chicken');
  let [filterSelected, setfilterSelected] = useState(productsSelected);

  function filterProducts(taxonomy) {
    let filtered = [];
    if (products) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].term === taxonomy) {
          filtered.push(products[i]);
        }
      }
    }
    return filtered;
  }

  function switchCategory(e) {
    productsSelected = filterProducts(e.target.value);
    setfilterSelected(productsSelected);
  }

  return (
    <Layout>
      <Header title="Nutritionals" />
      <Hero src="/static/images/placeholders/Snacks_Banner.jpg">
        <Hero.Title title="Nutritionals" color="#FFF" shadow />
      </Hero>

      <div className="Nutritionals__page">
        <section className="Section mb-0">
          <Container fluid className="px-0">
            <form
              id="nutritionals-search-form"
              className="Nutritionals__searchForm"
            >
              <label
                htmlFor="nutritionals-category"
                className="Nutritionals__searchLabel"
              >
                Choose a category
              </label>
              <div className="Nutritionals__searchField">
                <select
                  className="Nutritionals__searchInput -select"
                  id="nutritionals-category"
                  onChange={e => switchCategory(e)}
                >
                 { taxObjects }
                </select>
              </div>
              <label
                htmlFor="nutritionals-text-search"
                className="Nutritionals__searchLabel"
              >
                <span className="d-none d-md-block">Or </span>
                <span className="d-md-none">
                  Search for an item on our menu
                </span>
              </label>
              <div className="Nutritionals__searchField">
                <div className="Nutritionals__inputGroup">
                  <input
                    className="Nutritionals__searchInput"
                    type="text"
                    placeholder="Search for an item on our menu"
                  />
                  <button type="submit" className="Nutritionals__searchSubmit">
                    <SearchIcon />
                  </button>
                </div>
              </div>
            </form>
          </Container>
          <Table data={filterSelected} columns={columns} />
          <Container fluid className="px-0">
          {pageData.acf_data &&
        pageData.acf_data.components.map((section, sectionKey) => {
          return (
            <SectionMaker
              type={section.acf_fc_layout}
              params={section}
              key={sectionKey}
              sectionIndex={sectionKey}
            />
          );
        })}
            
          </Container>
        </section>
      </div>
    </Layout>
  );
};

// Page Static Props 
// 
Page.getStaticProps = async ({ query, res }) => {
  return {
     nutritionals:'getStaticProps '
  }
}

// Page Initial Props 
//
Page.getInitialProps = async ({ query, res }) => {
  return { query, nutritionals:'getInitialProps ' };
};

export default Page;
