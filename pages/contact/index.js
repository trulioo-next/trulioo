import React from 'react'
import Link from 'next/link'

import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'

import { connect } from 'react-redux'
import { inspect } from 'util'
import { selectProductsList, selectCurrentProduct } from '../../stores/products/selectors'

import { startListProducts, getListProducts  } from '../../stores/products/actions'

import './ContactPage.scss';

class ContactPage extends React.Component {

  static getInitialProps({query}) {
    return {query}
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  //
  render() {

    const products = this.props.products || []
    let product = {};
    if(products.length > 0) {
      for(var i = 0; i < products.length; i++) {
        if(parseInt(this.props.query.id) === products[i].id) {
          product = products[i];
        }
      }
    }
    //
    //
    return (
      <Layout>

        <Header title="Contact - Page" />

      </Layout>
    )
  }
}
//
//
const mapStateToProps = (state) => ({
  products: selectProductsList(state)
})

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(startListProducts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage)
