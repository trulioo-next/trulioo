import React from "react";
import { connect } from 'react-redux'
import Layout from '../../../containers/Layout/Layout'
import Header from '../../../components/Header/Header'
import Button from '@/components/Button';
import appActions from '../../../stores/nutritionals/actions'
import userSelectors from '../../../stores/user/selectors'
import menuSelectors from '../../../stores/nutritionals/selectors'
// import { lastFourSelector } from "../../../stores/nutritionals/selectors";

//  const pageData = useSelector(state => lastFourSelector(props.query.slug));
import Hero from '@/components/Hero';
import {css, jsx} from "@emotion/core";  
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
import './Category.scss';

class Category extends React.Component {
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
    this.props.getTheData()
  }
  componentDidUpdate() { }
  
  //
  render() {
 
    return (
      <Layout>
        <Header title="Nutritionals | Category" />
        <Hero src="/static/images/placeholders/category.png">
        </Hero>
        <div className="menu__page">
          
          
         
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

const Category_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
 
export default Category_;
