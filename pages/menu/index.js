import React from "react";
import { connect } from 'react-redux'
import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'
import Button from '@/components/Button';
import appActions from '../../stores/nutritionals/actions'
import userSelectors from '../../stores/user/selectors'
import menuSelectors from '../../stores/nutritionals/selectors'
import Hero from '@/components/Hero';
import {css, jsx} from "@emotion/core";  

import './Menu.scss';

class Menu extends React.Component {
  constructor(props) {
    super(props)
     
    this.state = {
      isLoading:false
    }
  }

  static async getInitialProps({ isServer, store }) {
    return {}
  }

  componentDidMount() { 

      // load the data 
      this.props.getTheData()

  }
  componentDidUpdate() {
      
       // get the data 
      console.log('THE DATA ', this.props.data )

  }
 
  render() {

    return (
      <Layout>
        <Header title="Nutritionals" />
        <Hero src="/static/images/placeholders/Nutritionals.png">
        </Hero>
        <div className="menu__page">
          <h2>Menu Page Items</h2>
        </div>
     </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: userSelectors.userDataSelector(state),
  data: menuSelectors.taxonomiesSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  getTheData: (payload) => dispatch(appActions.reqNutritionalsAction(payload)),
})

const Menu_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
 
export default Menu_;
