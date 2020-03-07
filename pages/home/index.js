import React from 'react';
import Link from 'next/link';

import Layout from '../../containers/Layout/Layout';
import Header from '../../components/Header/Header';

class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <Header title="Home - 7 - Eleven Canada" />
        <p>
          Go to
          <Link href="/page/home/">
            <a>/page/home/</a>
          </Link>
          for the homepage connected to WP.
        </p>
      </Layout>
    );
  }
}

export default HomePage;
