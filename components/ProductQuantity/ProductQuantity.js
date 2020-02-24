import React from 'react'
import PropTypes from 'prop-types'

import css from './ProductQuantity.scss';

class ProductQuantity extends React.Component{
  constructor(props) {
    super(props)
  }
  //
  componentDidMount() {
  }
  // 
  render() {
    
    return (
      <div className="product__quantity">
         <div className="quantity__Wrapper">
          <div id="minus__icon">
            <span>
              <img src="/static/images/minus-circle.svg" />
            </span>
          </div>
          <div>
            <span id="product__count">1</span>
          </div>
          <div id="plus__icon">
            <span>
              <img src="/static/images/plus-circle.svg" />
            </span>
          </div>
         </div>
      </div>
  
    )
  }
}
export default ProductQuantity

