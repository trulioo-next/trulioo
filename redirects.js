const REDIRECTS = [
  {
    from:   "/about",
    to:     "/about-us"
  },

  buildDynamicRedirect(
    '/about',
    '/about-us'
  )

];

//
function buildDynamicRedirect(fromVar,to) {
  // writing this for dynamic url ad redirects
  //
  let payload = {
     from:fromVar,
     to
  }
  if( process.browser ) {
      payload = {
       from:fromVar + "" + location.search,
       to: to + "" + location.search
    }
  }
  return payload;
}

export default REDIRECTS;
