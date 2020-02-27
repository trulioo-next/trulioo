import React, {useState, useEffect} from "react";
import { connect } from 'react-redux'

import {useSelector, useDispatch} from 'react-redux';
 
import Header from '../../components/Header/Header'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import Loader from '../../components/Loader/Loader'

import { selectIsLoading, selectIsLoaded, selectHeaderData, selectFooterData } from '../../stores/app/selectors'
import './Layout.scss';


class Layout extends React.Component {
  constructor(props) {
    super(props)
     

    
  }

  componentDidMount () {


    console.log('HEADER DATA :: ', this.props.headerData)
    console.log('FOOTER DATA :: ', this.props.footerData)

  }

  render() {
    const { isLoading } = this.props


  

    return (
      <main className="layout">
        <Header
          title="7 Eleven"
          description="Page MetaData here"
          canonical="http://7-eleven.ca"
        />
        <NavBar />

        <div className="conteiner">
          {isLoading && <Loader />}
          {this.props.children}
        </div>
        <Footer />
      </main>
    )
  }
}


const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  isLoaded: selectIsLoaded(state),
  headerData: selectHeaderData(state),
  footerData: selectFooterData(state)
})

export default connect(
  mapStateToProps,
)(Layout)
