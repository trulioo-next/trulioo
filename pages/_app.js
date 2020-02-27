import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import configureStore from '../stores/configureStore'
import appActions from '../stores/app/actions'
import withError from '../components-stateful/withErrorWrapper'
 

const withReduxDebugMode = false // process.env.NODE_ENV === 'development' || false;
class MyApp extends App {

    static async getInitialProps({ ctx, Component }) {

    	if(ctx.isServer) {
          await ctx.store.execSagaTask(appActions.reqStartupAction({ isAuthenticated: false,  query: ctx.query }));
          console.log(' CTX SERVER ')
        }


        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        if (pageProps.meta) {
            Component.meta = pageProps.meta;
        }

        return { pageProps }
 
    }

    constructor(props) {
    	super(props);
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {
    }

    componentDidMount() {
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
