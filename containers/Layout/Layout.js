import React from 'react';
import { connect } from 'react-redux';

import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

import { selectIsLoading, selectIsLoaded } from '@/stores/app/selectors';
import './Layout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
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
});

export default connect(mapStateToProps)(Layout);
