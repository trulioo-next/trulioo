
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'

import { useTable, useBlockLayout, useResizeColumns } from 'react-table'

import {css, jsx} from "@emotion/core";

import Error from "next/error";

import {
    reqNutritionalsAction
} from "../../stores/nutritionals/actions";

import { nutritionalsSelector } from "../../stores/nutritionals/selectors";


function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
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
    <div {...getTableProps()} className="table" >
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
  )
}


const Page = (props) => {
  
  const columns = [
    {
      Header: 'Flavour',
      accessor: 'flavour'
    }, 
    {
      Header: 'Serving Size',
      accessor: 'serving_size'
    }, 
    {
      Header: 'Calories',
      accessor: 'calories'
    }, 
    {
      Header: 'Total Fat',
      accessor: 'total_fat'
    }, 
    {
      Header: 'Trans Fat',
      accessor: 'trans_fat'
    }, 
    {
      Header: 'Cholesterol',
      accessor: 'cholesterol'
    }, 
    {
      Header: 'Sodium',
      accessor: 'sodium'
    }, 
    {
      Header: 'Carbohydrates',
      accessor: 'carbohydrates'
    }, 
    {
      Header: 'Dietary Fibre',
      accessor: 'dietary_fibre'
    }, 
    {
      Header: 'Sugars',
      accessor: 'sugars'
    }, 
    {
      Header: 'Protein',
      accessor: 'protein'
    }, 
    {
      Header: 'Vitamin A',
      accessor: 'vitamin_a'
    }, 
    {
      Header: 'Vitamin C',
      accessor: 'vitamin_c'
    }, 
    {
      Header: 'Calcium',
      accessor: 'calcium'
    }, 
    {
      Header: 'Iron',
      accessor: 'iron'
    }
  ]
 
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />
  }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(reqNutritionalsAction({}));
    }, []);
  
  const nutritionals = useSelector(state => nutritionalsSelector(state));
  console.log('nutritionals', nutritionals)
   
   return ( 
      <Layout>
        <Header title="Nutritionals" />
        <div css={css`margin-top:50px; position:relative; display:block;`}>
        </div>
        <Table
        data={nutritionals}
        columns={columns}
      />
      
      </Layout>
  );
};

Page.getInitialProps = async ({ query, res }) => {
  return { query }
};


export default Page;
