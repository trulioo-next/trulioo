import React from "react";
import { connect } from 'react-redux'
import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'
import Button from '@/components/Button';
import appActions from '../../stores/user/actions'
import appSelectors from '../../stores/user/selectors'
import Hero from '@/components/Hero';
import { css, jsx } from "@emotion/core";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import '../login/LoginScreen.scss';
import './SevenRewards.scss';

class SevenRewards extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      valid: false,
      isLoading: false,
      loggedIn: false,
      key: 'home',
      rewardsKey: 'tab1'
    }
  }

  static async getInitialProps({ isServer, store }) {
    return {}
  }

  componentDidMount() {

    let isUserAuth = this.props.user.auth
    if (!isUserAuth.error && isUserAuth) {
      this.setState({ loggedIn: true })
    }

  }
  componentDidUpdate() { }


  render() {

    return (
      <Layout>
        <Header title="7 Rewards" />
        {/* <Hero src="/static/images/placeholders/Get7Rewards_Background.jpg">
        </Hero> */}
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col rewards-wrapper">
              <Tabs
                id="rewards-tabs"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
              >
                <Tab eventKey="home" title="Rewards Menu" className={`rewards-menu-tabs ${this.state.rewardsKey}`}>
                  <Tabs
                    id="rewards-menu-tabs"
                    activeKey={this.state.rewardsKey}
                    onSelect={rewardsKey => this.setState({ rewardsKey })}>
                    <Tab eventKey="tab1" title="1000 Points">
                      <div class="container">
                        <div class="row">
                          <div class="col col-lg-6">
                            <div>1</div>
                          </div>
                          <div class="col col-lg-6">
                            <div>2</div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="tab2" title="1500 Points">
                      Content for 1500 points here
				            </Tab>
                    <Tab eventKey="tab3" title="2000 Points">
                      Content for 2000 points here
				            </Tab>
                    <Tab eventKey="tab4" title="2750 Points">
                      Content for 2750 points here
				            </Tab>
                    <Tab eventKey="tab5" title="4000 Points">
                      Content for 4000 points here
				            </Tab>
                    <Tab eventKey="tab6" title="6000 Points">
                      Content for 6000 points here
				            </Tab>
                  </Tabs>
                </Tab>
                <Tab eventKey="profile" title="Bonus Offers">
                  Bonus Offers
				        </Tab>
                <Tab eventKey="contact" title="Coupons">
                  Coupons
				        </Tab>
                <Tab eventKey="my-rewards" title="My Rewards">
                  My Rewards
				        </Tab>
              </Tabs>
            </div>
          </div>
        </div>

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
