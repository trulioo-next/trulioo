import React from "react";
import { connect } from 'react-redux'
import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'
import Button from '@/components/Button';
import appActions from '../../stores/user/actions'
import appSelectors from '../../stores/user/selectors'
import { css, jsx } from "@emotion/core";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import '../login/LoginScreen.scss';
import './SevenRewards.scss';

import { ListItemReward, ListItemCoupon, ListItemOffer } from '../../components/7rewards/blocks/items'
import { RewardsGraph } from '../../components/7rewards'

class SevenRewards extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      valid: false,
      isLoading: false,
      loggedIn: false,
      key: 'rewards',
      rewardsKey: 'tab1'
    }
  }
 
  static async getInitialProps ({ isServer, store }) {
    let userData = store.getState()
    return { userData };
  }

  componentDidMount() {

    let isUserAuth = this.props.user.auth
    if (!isUserAuth.error && isUserAuth) {
      this.setState({ loggedIn: true })
    }


    console.log('::: this.props.user :: ', this.props )

  }
  componentDidUpdate() { }


  render() {

    return (
      <Layout>
        <Header title="7 Rewards" />
        <Container className="container mt-5 mb-5">


            { this.props.user &&
             this.props.user.coupons.map((coupon, i) => {
              return 
                   <div key={`test--key--${i}`}>{coupon.description}</div>
               
            })
          }


          <Row>
            <Col className="rewards-wrapper">
              <Tabs
                id="rewards-tabs"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
              >
                <Tab eventKey="rewards" title="Rewards Menu" className={`rewards-menu-tabs ${this.state.rewardsKey}`}>
                  <Tabs
                    id="rewards-menu-tabs"
                    activeKey={this.state.rewardsKey}
                    onSelect={rewardsKey => this.setState({ rewardsKey })}>
                    <Tab eventKey="tab1" title="1000 Points">
                      <Container>
                        <Row>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <div>
                              <ListItemReward />
                            </div>
                          </Col>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                        </Row>
                      </Container>
                    </Tab>
                    <Tab eventKey="tab2" title="1500 Points">
                      <Container>
                        <Row>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                        </Row>
                      </Container>
                    </Tab>
                    <Tab eventKey="tab3" title="2000 Points">
                      <Container>
                        <Row>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                        </Row>
                      </Container>
                    </Tab>
                    <Tab eventKey="tab4" title="2750 Points">
                      <Container>
                        <Row>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                        </Row>
                      </Container>
                    </Tab>
                    <Tab eventKey="tab5" title="4000 Points">
                      <Container>
                        <Row>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                        </Row>
                      </Container>
                    </Tab>
                    <Tab eventKey="tab6" title="6000 Points">
                      <Container>
                        <Row>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                          <Col className="col" lg="6" md="6" sm="12" xs="12">
                            <ListItemReward />
                          </Col>
                        </Row>
                      </Container>
                    </Tab>
                  </Tabs>
                </Tab>
                <Tab eventKey="bonus-offers" title="Bonus Offers">
                  <Container>
                    <Row>
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <ListItemOffer />
                      </Col>
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <ListItemOffer />
                      </Col>
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <ListItemOffer />
                      </Col>
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <ListItemOffer />
                      </Col>
                    </Row>
                  </Container>
                </Tab>
                <Tab eventKey="coupons" title="Coupons">
                  <Container>
                    <Row>
                      <Col className="col d-flex justify-content-center mb-3">
                        <Button
                          href="#"
                          as="#"
                          className="coupon-button"
                        >
                          Get coupons for your location
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <ListItemCoupon />
                      </Col>
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <ListItemCoupon />
                      </Col>
                    </Row>
                  </Container>
                </Tab>
                <Tab eventKey="my-rewards" className="my-rewards-tab" title="My Rewards">
                  <Container className="pb-2">
                    <Row>
                      <Col className="col d-flex justify-content-start align-items-center" lg="6" md="6" sm="12" xs="12">
                        <h3>My Rewards</h3>
                      </Col>
                      <Col className="col d-flex justify-content-end" lg="6" md="6" sm="12" xs="12">
                        <div className="wallet-points">
                          <span className="points-balance">0</span>
                          <span className="points-text">Points Remaining</span>
                        </div>
                      </Col>
                    </Row>
                    <Row className="rewards-row">
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <p>0 Rewards Ready</p>
                      </Col>
                      <Col className="col d-flex justify-content-end" lg="6" md="6" sm="12" xs="12">
                        <Button className="add-items-button" href="#">Add Items</Button>
                      </Col>
                    </Row>
                    <Row className="wallet-row">
                      <Col className="col d-flex align-items-center justify-content-center" lg="12">
                        Your wallet is empty.
                      </Col>
                    </Row>
                    <Row className="rewards-row">
                      <Col className="col" lg="12">
                        <p>Other Available Offers</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col d-flex justify-content-center mb-3 mt-3">
                        <Button
                          href="#"
                          as="#"
                          className="coupon-button dark"
                        >
                          Get coupons for your location
                        </Button>
                      </Col>
                    </Row>
                    <Row className="coupons-row">
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <ListItemCoupon />
                      </Col>
                      <Col className="col" lg="6" md="6" sm="12" xs="12">
                        <ListItemCoupon />
                      </Col>
                    </Row>
                  </Container>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: appSelectors.userDataSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  userAuthRequest: (payload) => dispatch(appActions.reqUserAuthAction(payload)),
})

const SevenRewards_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(SevenRewards)

export default SevenRewards_;
