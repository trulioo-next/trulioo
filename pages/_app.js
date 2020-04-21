import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import configureStore from '../stores/configureStore'
import appActions from '../stores/app/actions'
import nutritionalsActions from '../stores/nutritionals/actions'
import withError from '../components-stateful/withErrorWrapper'

const withReduxDebugMode = false // process.env.NODE_ENV === 'development' || false;
class MyApp extends App {

    static async getInitialProps({ ctx, Component }) {
 
    	if(ctx.isServer) {
          await ctx.store.execSagaTask(appActions.reqStartupAction({ isAuthenticated: false,  query: ctx.query }));
          await ctx.store.execSagaTask(nutritionalsActions.reqNutritionalsAction({ isAuthenticated: false,  query: ctx.query }));
        }
 
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
 
        return { pageProps }
 
    }
 

    constructor(props) {
    	super(props);
    }

    componentWillUnmount() { }

    componentDidUpdate() { }

    componentDidMount() {

        // Pass user auth to anywhere in the app 
        //
        let isUserAuth = this.props.store.getState()
        if( isUserAuth && isUserAuth.user ) {
            // check if users token expires 
            // If it does, clear the auth session 
            //
            // console.log('IS USER AUTH  ', isUserAuth.user.auth )
        }
 
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
