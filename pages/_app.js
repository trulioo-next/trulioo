import { Provider } from 'react-redux';
import App from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import configureStore from '../stores/configureStore';
import appActions from '../stores/app/actions';
import pageActions from '../stores/page/actions';
import articleActions from '../stores/articles/actions';
import withError from '../components-stateful/withErrorWrapper';
import { isBrowser } from 'react-device-detect';
import { CustomCursor } from '@/components/CustomCursor';
import CookieConsent from 'react-cookie-consent';

import '../styles/index.scss';

import REDIRECTS from '../redirects';

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

      REDIRECTS.map(item => {
        if (ctx.asPath === item.from) {
          ctx.res.writeHead(302, {
            Location: item.to,
          });
          ctx.res.end();
          return;
        }
      });

      // if( ctx.query.type ) {
      //  console.log('PAGE TYPE FOUND ! ', ctx.query.type )
      //  await ctx.store.execSagaTask(
      //    articleActions.reqArticlesTypesAction({ topic_id: '', type_id: '', offset:0, posts_per_page: 5 }),
      //  );
      //
      // }

      // console.log('ctx.query :: >> ', ctx.query )
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  //
  constructor(props) {
    super(props);

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
        <CookieConsent containerClasses={'cookie-consent'}>
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
