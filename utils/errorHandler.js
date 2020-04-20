'use strict'
import * as Sentry from '@sentry/browser';


const VERSION = process.env.VERSION
const NODE_ENV = process.env.NODE_ENV
const SHOP_ENV = process.env.SHOP_ENV
const SENTRY_DNS = process.env.SENTRY_DNS || false

const DISPLAY_ERRORS = true;
 
module.exports = function ({
  error,
  context = '7-11-webshop',
  tag = { key: '7-11', value: 'error' },
  crumb = {
    category: '7-11-webapp',
    message: 'Something went wrong',
    data: {}
  }
}) {

  if(DISPLAY_ERRORS) {
    Sentry.init({
      dsn: 'https://6d10f24d3f534d76b1d65649cc2a0ea0@o380788.ingest.sentry.io/5207146'
    })
    // Sentry.configureScope(function(scope) {
    //   scope.setExtra(`7-11 - ${NODE_ENV}`, context);
    //   scope.setTag(tag.key, tag.value);
    // });

    if(crumb) {
      Sentry.addBreadcrumb(crumb);
    }

    const errorMessage = error.message || error
    const errorObject = (error instanceof Error) ? error : new Error(errorMessage)

    // console.log('SENTRY ERROR ', errorMessage )
    Sentry.captureException(errorObject);
  } else {
    // TODO: implement log on file as a fallback
    console.log(context, error);
  }

}
