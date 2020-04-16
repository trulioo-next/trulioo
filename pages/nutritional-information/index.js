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

import './Nutritionals.scss';

import { reqNutritionalsAction } from '@/stores/nutritionals/actions';

import {
  nutritionalsSelector,
  nutritionalByTaxonomySelector,
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

const Disclaimer = props => {
  const [opened, setOpened] = useState(false);

  return (
    <Accordion
      className={classNames('Nutritionals__disclaimer', { '-opened': opened })}
    >
      <Accordion.Toggle
        className="Nutritionals__disclaimerHeader d-md-none text-center"
        eventKey="disclaimer"
      >
        Disclaimer
        <CloseIcon className="Nutritionals__closeIndicator" />
      </Accordion.Toggle>
      <Accordion.Collapse
        className="Nutritionals__disclaimerContent d-md-block"
        eventKey="disclaimer"
        onEntered={() => setOpened(true)}
        onExited={() => setOpened(false)}
      >
        <>
          <p>
            The information in this guide is effective as of February 7, 2019
            and is based on our standard product formulations, variations may
            occur. Nutrition information was obtained through analysis by
            7-Eleven and information provided by our suppliers.
          </p>
          <p>
            Daily Calorie and Sodium Requirements: Healthy adults should aim for
            1,500 to 2,300 milligrams of sodium per day. Children and seniors
            need less. Healthy adults should aim for 2,000 to 2,400 calories per
            day. Individual needs vary depending on age, activity level and
            gender. (Source: Health Canada) The Informed Dining program is a
            voluntary nutrition information program developed by the Province of
            British Columbia. For more information, please visit
            www.InformedDining.ca. The nutrition information provided has been
            supplied by the restaurant itself. Such nutrition information has
            not been independently researched, written or verified by the
            Government of British Columbia. The Government of British Columbia
            assumes no responsibility or liability arising from any errors or
            omission of information, or from the use of any information
            contained within the nutrition information supplied by the
            restaurant.
          </p>
        </>
      </Accordion.Collapse>
    </Accordion>
  );
};


function Page({ nutritionals }) {
// const Page = props => {
  const columns = COLUMNS;

  // console.log('PROPS TO LOAD ---> >>>>  ', nutritionals )

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqNutritionalsAction({}));
  }, []);

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
                  <option value="crispy-classic-chicken">
                    Crispy Classic Chicken
                  </option>
                  <option value="fountain">Fountain</option>
                  <option value="fresh-bakery">Fresh Bakery</option>
                  <option value="grill">Grill</option>
                  <option value="hot-beverages">Hot Beverages</option>
                  <option value="hot-food">Hot Food</option>
                  <option value="iced-coffee">Iced Coffee</option>
                  <option value="slurpee">Slurpee</option>
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
            <Disclaimer />
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
