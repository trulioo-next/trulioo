import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

import {
  selectIsLoading,
  selectIsLoaded,
  selectHeaderData,
  selectFooterData,
} from '../../stores/app/selectors';

import './Layout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log('HEADER DATA :: ', this.props.headerData);
    // console.log('FOOTER DATA :: ', this.props.footerData);
  }

  render() {
    const { isLoading } = this.props;

    return (
      <div className="Layout">
        <Header
          title="7 Eleven"
          description="Page MetaData here"
          canonical="http://7-eleven.ca"
        />
        <NavBar />

        <main className="SiteMain">
          {isLoading && <Loader />}
          {this.props.children}
        </main>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  isLoaded: selectIsLoaded(state),
  headerData: selectHeaderData(state),
  footerData: selectFooterData(state),
});

export default connect(mapStateToProps)(Layout);
