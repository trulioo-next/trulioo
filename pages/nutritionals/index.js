
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'
import COLUMNS from "../../data/columns";
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'
import {css, jsx} from "@emotion/core";
import Hero from '@/components/Hero';

import Error from "next/error";

import './Nutrutionals.scss';

import {
    reqNutritionalsAction
} from "../../stores/nutritionals/actions";

import { nutritionalsSelector, nutritionalByTaxonomySelector } from "../../stores/nutritionals/selectors";


function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 450,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  )

  return (
    <div>
    <div {...getTableProps()} className="table"  >
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className="th">
                {column.render('Header')}
                
                <div
                  {...column.getResizerProps()}
                  className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <div {...row.getRowProps()} className="tr">
              {row.cells.map(cell => {
                return (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}

const Page = (props) => {
  
  const columns = COLUMNS;


   
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(reqNutritionalsAction({}));
  }, []);

  let [taxonomySelected, setTaxonomySelected] = useState('crispy-classic-chicken');
  let products = useSelector(nutritionalByTaxonomySelector());
  let productsSelected = filterProducts('crispy-classic-chicken')
  let [filterSelected, setfilterSelected] = useState(productsSelected);
 
 function filterProducts(taxonomy) {
  
   let filtered = [];
   if(products) {
     for(var i = 0; i < products.length; i++ ) {
        if(products[i].term === taxonomy) {
            filtered.push(products[i])
        }
     }
   }
    return filtered;
 }   
   
  function switchCategory(e) {
     productsSelected = filterProducts(e.target.value)
     setfilterSelected(productsSelected)
  }
   
   return ( 
      <Layout>
        <Header title="Nutritionals" />
        <Hero src="/static/images/placeholders/Nutritionals.png">
 
        </Hero>
        
        <div className="container">
          <div className="row">
            <div className="col-md-12 margins">
                <select className="select" css={css`margin-top:50px; margin-bottom:50px; position:relative; display: block;`} id="cars" onChange={(e) => switchCategory(e)}>
                  <option value="crispy-classic-chicken">Crispy Classic Chicken</option>
                  <option value="fountain">Fountain</option>
                  <option value="fresh-bakery">Fresh Bakery</option>
                  <option value="grill">Grill</option>
                  <option value="hot-beverages">Hot Beverages</option>
                  <option value="hot-food">Hot Food</option>
                  <option value="iced-coffee">Iced Coffee</option>
                  <option value="slurpee">Slurpee</option>
                </select>
              </div>
            </div>
          </div>
        <Table
        data={filterSelected}
        columns={columns}
        />
     
      </Layout>
  );
};

Page.getInitialProps = async ({ query, res }) => {
  return { query }
};


export default Page;
