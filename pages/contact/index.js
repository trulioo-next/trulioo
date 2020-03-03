import React from 'react'
import Link from 'next/link'

import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'

import { connect } from 'react-redux'
import { inspect } from 'util'

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
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage)
