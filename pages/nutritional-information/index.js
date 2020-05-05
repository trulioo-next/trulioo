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

 

const Page = (props) => {
  const columns = COLUMNS;


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: 'nutritional-information' }));
  }, []);

  const pageData = useSelector(state => pageDataSelector(state));
  let taxonomies = useSelector(state => taxonomiesSelector(state));

  let defaultCategory = '';

  // console.log('PROPS TO LOAD ---> >>>>  ', taxonomies )
  let taxObjects = '';
  if(taxonomies) {
    taxonomies = taxonomies.filter(item => item.show_on_nutritionals_page !== false);
    taxObjects = taxonomies.map((item, key) =>
      <option key={item.term_id} value={item.slug}>{item.name}</option>
    );
  }

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(reqNutritionalsAction({}));
  // }, []);

  let [taxonomySelected, setTaxonomySelected] = useState( defaultCategory );
  let products = useSelector(nutritionalByTaxonomySelector());
  let productsSelected = filterProducts(defaultCategory);
  let [filterSelected, setfilterSelected] = useState(productsSelected);


  function removeProductsFromHiddenCategories(prods)
  {
    let taxTerms = [];
    taxonomies.map(t => {
      if (t.show_on_nutritionals_page !== false)
      { taxTerms.push(t.slug);
      }
    });

    return prods.filter(product => {
      return taxTerms.includes(product.term);
    });
  }


  function filterProducts(taxonomy) {
    let filtered = [];
    if (products) {
      products = removeProductsFromHiddenCategories([...products]);
      if (taxonomy === '')
      { return [...products];
      }
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


  function searchProducts(searchTermParam) {
    const searchTerm = searchTermParam.toLowerCase().trim();
    let filtered = [];
    if (products) {
      products = removeProductsFromHiddenCategories([...products]);
      for (var i = 0; i < products.length; i++) {
        if (products[i].flavour.toLowerCase().includes(searchTerm)) {
          filtered.push(products[i]);
        }
      }
    }
    return filtered;
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const searchFor = e.target.getElementsByTagName('input')[0].value.trim();
    if (!searchFor)
    { return false;
    }
    productsSelected = searchProducts(searchFor);
    setfilterSelected(productsSelected);
  }


  return (
    <Layout>
      <Header title="Nutritionals" />
      <Hero src="/static/images/placeholders/Nutritional_Banner.jpg">
        <Hero.Title title="Nutritionals" color="#FFF" shadow />
      </Hero>

      <div className="Nutritionals__page">
        <section className="Section mb-0">
          { pageData && pageData.acf_data && pageData.acf_data.page_content && (
          <Container fluid className="Nutritionals inner__copy" dangerouslySetInnerHTML={{ __html: pageData.acf_data.page_content}}></Container>
          )}
          <Container fluid className="px-0">
            <form
              id="nutritionals-search-form"
              className="Nutritionals__searchForm"
              onSubmit={e => handleSearchSubmit(e)}
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
                  defaultValue={defaultCategory}
                  onChange={e => switchCategory(e)}
                >
                 <option value=''>Select category</option>
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
          { pageData.acf_data.components &&
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
