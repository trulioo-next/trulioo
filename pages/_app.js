import { Provider } from 'react-redux';
import App from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import configureStore from '../stores/configureStore';
import appActions from '../stores/app/actions';
import pageActions from '../stores/page/actions';
import withError from '../components-stateful/withErrorWrapper';
import * as gtag from '../utils/gtag';
import { isBrowser } from 'react-device-detect';
import { CustomCursor } from '@/components/CustomCursor';
import CookieConsent from 'react-cookie-consent';

import '../styles/index.scss';

const withReduxDebugMode = false; // process.env.NODE_ENV === 'development' || false;
class MyApp extends App {
  static async getInitialProps({ ctx, Component }) {
    if (ctx.isServer) {
      await ctx.store.execSagaTask(
        appActions.reqStartupAction({
          isAuthenticated: false,
          query: ctx.query,
        }),
      );
      await ctx.store.execSagaTask(
        pageActions.reqPageDataAction({ query: ctx.query }),
      );
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  //
  constructor(props) {
    super(props);
    Router.events.on('routeChangeComplete', url => {
      gtag.pageview(url);
    });
    this.state = {
      cursor: false,
    };
  }

  componentWillUnmount() {}

  componentDidUpdate() {}

  componentDidMount() {
    this.setState({ cursor: isBrowser });
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
        <Provider store={store}>
            <CookieConsent>
                This website uses cookies to enhance the user experience.
            </CookieConsent>
            <Component {...pageProps} />    
            {this.state.cursor && <CustomCursor />} 
        </Provider>      
    );
  }
}

// export default MyApp
export default withError(
  withRedux(configureStore, {
    VERSION: process.env.VERSION || null,
    debug: withReduxDebugMode,
  })(MyApp),
);
