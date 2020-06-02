const fetch = require('./utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL

const fetchData = async() => {
  return await fetch(ENDPOINT_URL+'/acf/v3/options/redirects', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

const REDIRECTS = [
  {
    from:   "/about",
    to:     "/about-us"
  },

  fetchData()
  .then((data) => {
    data.acf.redirect_list.forEach((redirect, index) => {
      if( process.browser ) {
        buildDynamicRedirect(redirect.link_from.url, redirect.link_to.url);
      }
    })
  })

];

function buildDynamicRedirect(fromVar,to) {
  // writing this for dynamic url ad redirects
  //
  console.log(fromVar,to);
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
