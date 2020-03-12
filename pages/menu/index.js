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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
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
    this.props.getTheData()
  }
  componentDidUpdate() { }
  
  buildColumnRows() {
    
    let data = this.props.data;
    if( data ) {
      let counter = 0;
      let containers = data.map((item) => {
         counter++;
         let image = item.image ? item.image.url : 'https://via.placeholder.com/150'; 
         return <Col className="no--margins" xs={12} md={3} key={'tax-'+counter}>
         <Link href={'/menu/'+item.slug}>
           <div className="block--padding">
             <div className="item__title">{item.name}</div>
             <div className="background--image"><img src={image} /></div>
           </div>
           </Link>
         </Col>
       
      });
    
     return containers;
    }
  }
  //
  render() {

    let rows = this.buildColumnRows();

    return (
      <Layout>
        <Header title="Nutritionals" />
        <Hero src="/static/images/placeholders/Nutritionals.png">
        </Hero>
        <div className="menu__page">
          
          <Row>
            { rows }
          </Row>
         
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
