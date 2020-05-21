import React, { Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '@/components/Button';

import SearchIcon from '@/static/images/search.svg';

import DeliveryUnavailable from './DeliveryUnavailable';
import DeliveryOption from './DeliveryOption';

import './Delivery.scss';

function buildDeliveryQuery(location) {
  var url = new URL(
    'https://liveapi.yext.com/v2/accounts/me/locations/geosearch',
  ),
    params = {
      location: location,
      limit: 50,
      radius: 5,
      filters: '[{"closed":false},{"custom27352":"true"}]',
      resolvePlaceholders: true,
      api_key: '4c8292a53c2dae5082ba012bdf783295',
      v: 20180210,
    };

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  return url;
}

async function getLocations(url) {
  let response = await fetch(url);

  if (response.status == 200) {
    let result = await response.json();

    var locations = result.response.locations,
      deliveryOptions = [],
      uberEatsOption,
      skipthedishesOption,
      geo = result.response.geo;

    for (var i = 0; i < locations.length; i++) {
      if (locations[i].customFields['169457']) {
        
        if (uberEatsOption && skipthedishesOption) {
          break;
        }
        if (!uberEatsOption) {
          var uberIndex = locations[i].customFields['169457'].findIndex(item =>
            item.includes('ubereats'),
          );

          if (uberIndex >= 0) {
            uberEatsOption = true;

            deliveryOptions.push({
              deliveryService: 'UberEats',
              url: locations[i].customFields['169457'][uberIndex],
            });
          }
        } 
        if (!skipthedishesOption) {
          var skipthedishesIndex = locations[i].customFields[
            '169457'
          ].findIndex(item => item.includes('skipthedishes'));
          if (skipthedishesIndex >= 0) {
            skipthedishesOption = true;

            deliveryOptions.push({
              deliveryService: 'skipthedishes',
              url: locations[i].customFields['169457'][skipthedishesIndex],
            });
          }
        }
      }
    }

    return { geo: geo, filtered: deliveryOptions };
  } else {
    throw new Error(response.status);
  }
}

const DeliveryAvailable = props => {
  return (
    <div className="container-fluid Delivery__section">
      <div className="row">
        <div className="col col-12 col-md-5 text-center text-md-left Section__body">
          {props.title && <h3 className="Section__title">{props.title}</h3>}
          {props.computedAddress && (
            <p className="Delivery__computedAddress">
              <strong>Computed Address:</strong>
              <br />
              {props.computedAddress}
            </p>
          )}
          <div
            className="Section__content"
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></div>
        </div>
        <div className="col col-12 col-md-7">
          <motion.div className="Delivery__options row">
            {props.children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const DeliveryResult = props => {
  const resultVariants = {
    shown: {
      opacity: 1,
      height: 'auto',
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    hidden: {
      opacity: 0,
      height: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <motion.section
      className="Section Delivery__result"
      variants={resultVariants}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      {props.children}
    </motion.section>
  );
};

class SectionGetDeliveryAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      deliveryOptions: [],
      computedAddress: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNavigator = this.handleNavigator.bind(this);

    this.sectionRef = React.createRef();
    this.input = React.createRef();
  }

  async handleSubmit(event) {
    let url = buildDeliveryQuery(this.input.current.value);
    event.preventDefault();

    this.setState({
      isLoaded: false,
      deliveryOptions: [],
      computedAddress: null,
    });

    await getLocations(url).then(
      result => {
        if(result.geo.address)
        this.setState({
          isLoaded: true,
          deliveryOptions: result.filtered,
          computedAddress: `${result.geo.address}, ${result.geo.locality}, ${result.geo.region}`,
        });
        else this.setState({
          isLoaded: true,
          deliveryOptions: result.filtered,
          computedAddress: `${result.geo.locality}, ${result.geo.region}`,
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        });
      },
    );

    this.sectionRef.scrollIntoView({ behavior: 'smooth' });
  }

  async handleNavigator() {
    let loc;
    let url;

    this.setState({
      isLoaded: false,
      deliveryOptions: [],
      computedAddress: null,
    });

    const success = position => {
      loc = position.coords.latitude + ',' + position.coords.longitude;
      url = buildDeliveryQuery(loc);

      getLocations(url).then(
        result => {
          this.setState({
            isLoaded: true,
            deliveryOptions: result.filtered,
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
    };

    const error = err => {
      this.setState({
        isLoaded: true,
        error,
      });
    };

    success.bind(this);
    error.bind(this);

    navigator.geolocation.getCurrentPosition(success, error);
    this.sectionRef.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    // console.log('SectionGetDeliveryAddress  PROPS :: ', this.props);

    const { error, isLoaded, deliveryOptions } = this.state;

    return (
      <>
        <section
          className="Section Delivery"
          ref={sectionRef => {
            this.sectionRef = sectionRef;
          }}
        >
          <div className="bg-white">
            <div className="container Section__container">
              <div className="row">
                <div className="col col-12">
                  <h2 className="Section__title text-center">
                    {this.props.title}
                  </h2>
                  <div
                    className="Section__content"
                    dangerouslySetInnerHTML={{ __html: this.props.content }}
                  ></div>
                </div>
              </div>
              <div className="row justify-content-center mt-5">
                <div className="col col-11 col-md-9">
                  <form className="Delivery__form">
                    <div className="Delivery__field">
                      <label
                        htmlFor="delivery-search"
                        className="Delivery__fieldPrepend"
                      >
                        <SearchIcon className="Delivery__fieldIcon" />
                      </label>
                      <input
                        id="delivery-search"
                        type="text"
                        className="Delivery__input"
                        ref={this.input}
                        placeholder="Enter delivery address"
                      />
                    </div>
                    <div className="Delivery__field align-items-center justify-content-between">
                      <Button
                        id="delivery_search"
                        type="submit"
                        onClick={this.handleSubmit}
                        className="bg-info Delivery__action"
                      >
                        Search
                      </Button>
                      <span className="Delivery__actionDivider">or</span>
                      <Button
                        id="delivery_usemylocation"
                        type="button"
                        className="bg-info Delivery__action"
                        onClick={this.handleNavigator}
                      >
                        Use My Location
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AnimatePresence>
          {isLoaded && (
            <DeliveryResult>
              {deliveryOptions.length > 0 ? (
                <DeliveryAvailable
                  computedAddress={this.state.computedAddress}
                  {...this.props.delivery_available}
                >
                  {deliveryOptions.map((option, i) => {
                    return (
                      <DeliveryOption
                        key={`delivery-option-${i}`}
                        image={
                          option.deliveryService === 'UberEats'
                            ? this.props.delivery_available.ubereats_image
                            : this.props.delivery_available.skipthedishes_image
                        }
                        {...option}
                      />
                    );
                  })}
                </DeliveryAvailable>
              ) : (
                  <DeliveryUnavailable {...this.props.delivery_unavailable} />
                )}
            </DeliveryResult>
          )}
        </AnimatePresence>
      </>
    );
  }
}

SectionGetDeliveryAddress.defaultProps = {};

export default SectionGetDeliveryAddress;
