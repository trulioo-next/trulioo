import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { autop } from '@wordpress/autop';

import { FlipButton } from '../FlipButton';

export const PricingTable = ({ data }) => {
  let tableLength = 0;
  const tableBodyData = [];

  if (data) {
    const tierLength = data.length;

    for (let i = 0; i < data.length; i++) {
      const column = data[i];

      if (column.price_lists.length > tableLength) {
        tableLength = column.price_lists.length;
      }
    }

    for (let row = 0; row < tableLength; row++) {
      const rowData = [];

      for (let column = 0; column < data.length; column++) {
        const cellData = {};

        if (data[column].price_lists[row]) {
          cellData.last_cell = (row + 1 === data[column].price_lists.length);
          cellData.value = data[column].price_lists[row].list;

          rowData.push(cellData);
        }
      }

      tableBodyData.push(rowData);
    }
  }

  return (
    <div className="pricing-table-wrapper">
      <table className="pricing-table mb-5">
        <thead>
          <tr>
            {data.map((tier, columnIndex) => (
              <th className="pricing-table-cell table-header text-md-center" style={ { gridColumnStart: columnIndex + 1, gridRowStart: 1 } } key={ columnIndex }>
                <h3 className="h4">
                  { tier.heading }
                </h3>
                <span className="d-flex text-primary align-items-center justify-content-center">
                  <strong className="h2">{ tier.price }</strong>
                  { tier.price_terms && <span className="h4">/{ tier.price_terms }</span> }
                </span>
                { tier.price_button &&
                  <FlipButton
                    className="d-block d-md-inline-block"
                    size="sm"
                    color="primary"
                    href={ tier.price_button.url }
                  >{tier.price_button.title}</FlipButton> }
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {tableBodyData.map((row, rowIndex) => (
            <tr key={ rowIndex }>
              {row.map((cell, cellIndex) => {
                if (cell.last_cell) {
                  return (
                    <td rowSpan={ tableBodyData.length - rowIndex } key={ cellIndex } dangerouslySetInnerHTML={ { __html: autop(cell.value) } } />
                  );
                }
                return (
                  <td key={ cellIndex } dangerouslySetInnerHTML={ { __html: autop(cell.value) } } />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

PricingTable.propTypes = {
  data: PropTypes.object
};
