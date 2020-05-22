import { Provider } from 'react-redux'
import App from 'next/app'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import configureStore from '../stores/configureStore'
import appActions from '../stores/app/actions'
import withError from '../components-stateful/withErrorWrapper'
import * as gtag from '../utils/gtag'
 


const withReduxDebugMode = false // process.env.NODE_ENV === 'development' || false;
class MyApp extends App {

    static async getInitialProps({ ctx, Component }) {
 
    	if(ctx.isServer) {
          await ctx.store.execSagaTask(appActions.reqStartupAction({ isAuthenticated: false,  query: ctx.query }));
           
        }
 
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
 
        return { pageProps }
 
    }
 

    constructor(props) {
        super(props);
        Router.events.on('routeChangeComplete', url => { gtag.pageview(url); } )
    }

    componentWillUnmount() { }

    componentDidUpdate() { }

    componentDidMount() {

        // Pass user auth to anywhere in the app 
        //
          
    }


    render() {
		const {Component, pageProps, store  } = this.props;

        return (         
			<Provider store={store}>
				<Component {...pageProps} />     
			</Provider>
                
        )
    }
}

// export default MyApp
export default withError(withRedux(configureStore, {
    VERSION: process.env.VERSION || null,
    debug: withReduxDebugMode
})(MyApp))
