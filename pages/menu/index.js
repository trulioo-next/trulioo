import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import appActions from '@/stores/nutritionals/actions';
import userSelectors from '@/stores/user/selectors';
import menuSelectors from '@/stores/nutritionals/selectors';

import Layout from '@/containers/Layout';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

import './Menu.scss';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  static async getInitialProps({ isServer, store }) {
    return {};
  }

  componentDidMount() {
    this.props.getTheData();
  }
  componentDidUpdate() {}

  buildColumnRows() {
    let data = this.props.data;
    if (data) {
      data = [...data];
      const sortedData = data.sort((a, b) => {
        return a.priority - b.priority;
      })
      let counter = 0;
      let containers = sortedData.map(item => {
        counter++;
        let image = item.image
          ? item.image.url
          : 'https://via.placeholder.com/150';
        return (
          <div className="Menu__gridItem" key={'tax-' + counter}>
            <Link href={'/menu/' + item.slug}>
              <a>
                <figure className="Menu__category">
                  <div className="Menu__categoryImage">
                    <img src={image} aria-describedby />
                  </div>
                  <figcaption className="Menu__categoryLabel">
                    {item.name}
                  </figcaption>
                </figure>
              </a>
            </Link>
          </div>
        );
      });

      return containers;
    }
  }
  //
  render() {
    let rows = this.buildColumnRows();

    return (
      <Layout>
        <Header title="Menu" />
        <Hero src="/static/images/placeholders/Snacks_Banner.jpg">
          <Hero.Title title="Menu" color="#FFF" shadow />
        </Hero>
        <div className="Menu__page">
          <div className="Menu__grid">{rows}</div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelectors.userDataSelector(state),
  data: menuSelectors.taxonomiesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getTheData: payload => dispatch(appActions.reqNutritionalsAction(payload)),
});

const Menu_ = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default Menu_;
