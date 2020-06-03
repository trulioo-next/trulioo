import { Provider } from 'react-redux';
import App from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import configureStore from '../stores/configureStore';
import appActions from '../stores/app/actions';
import pageActions from '../stores/page/actions';
import pressActions from '../stores/pressRelease/actions';
import resoucesActions from '../stores/resources/actions';
import articleActions from '../stores/articles/actions';

import withError from '../components-stateful/withErrorWrapper';
import { isBrowser } from 'react-device-detect';
import { CustomCursor } from '@/components/CustomCursor';
import CookieConsent from 'react-cookie-consent';

import '../styles/index.scss';

import REDIRECTS from '../redirects';

const withReduxDebugMode = false;
class MyApp extends App {
  static async getInitialProps({ ctx, Component }) {
    if (ctx.isServer) {
      await ctx.store.execSagaTask(
        appActions.reqStartupAction({
          isAuthenticated: false,
          query: ctx.query,
        }),
      );

      let pathName = ctx.asPath;
      console.log('ACTUAL pathName !!  ::   ', pathName );
      if(pathName !== '/favicon.ico' && pathName !== '_next' ) {
        let n = pathName.split('/')[1];
        if(n === '') {
          n = 'home';
        }
        // console.log('pathName !!  :: >>> ctx.asPath  ', n );
        // await ctx.store.execSagaTask(
        //   pageActions.reqPageDataAction({ query: n }),
        // );
      }
      if( pathName === '/') {
        await ctx.store.execSagaTask(
           pageActions.reqPageDataAction({ query: 'home' }),
        );
      }
      // Load Press
      if( pathName === '/pressrelease') {
        await ctx.store.execSagaTask(
          pressActions.reqPressReleaseAction({ payload: 1 }),
        );
        await ctx.store.execSagaTask(
          pageActions.reqPageDataAction({ query: 'pressrelease' }),
        );
      }

      // Load Blog
      if( pathName === '/blog') {
        await ctx.store.execSagaTask(
          articleActions.reqArticlesAction({ post_id: 1, offset:0, posts_per_page: 5 }),
        );
        await ctx.store.execSagaTask(
          pageActions.reqPageDataAction({ query: 'blog' }),
        );
      }

      // Load Resouces
      if( pathName === '/resources') {
        await ctx.store.execSagaTask(
          resoucesActions.reqResourcesAction({ payload: 1 }),
        );
        await ctx.store.execSagaTask(
          pageActions.reqPageDataAction({ query: 'resources' }),
        );
      }


      // First Child Page
      console.log('ctx.pathname ', ctx.pathname )
      if(ctx.pathname === '/[page]') {
        await ctx.store.execSagaTask(
          pageActions.reqPageDataAction({ query: ctx.query.page }),
        );
      }

      // Second Child Page
      if(ctx.pathname === '/[page]/[slug]') {
        if(ctx.query.slug === false || ctx.query.slug === 'false') {
          await ctx.store.execSagaTask(
            pageActions.reqPageDataAction({ query: ctx.query.page }),
          );
        } else {
          await ctx.store.execSagaTask(
            pageActions.reqPageDataAction({ query: ctx.query.page+'--'+ ctx.query.slug}),
          );
        }
      }

      if(ctx.pathname === '/company/[slug]') {
          let slug = 'company--'+ ctx.query.slug
          await ctx.store.execSagaTask(
            pageActions.reqPageDataAction({ query: slug }),
          );
      }

      if(ctx.pathname === '/products/[slug]') {
          console.log('PRODUCTS ', ctx.query )
          await ctx.store.execSagaTask(
            pageActions.reqPageDataAction({ query: 'products--'+ ctx.query.slug }),
          );
      }

      // REDIRECTS.map(item => {
      //   if (ctx.asPath === item.from) {
      //     ctx.res.writeHead(302, {
      //       Location: item.to,
      //     });
      //     ctx.res.end();
      //     return;
      //   }
      // });


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
